import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageMap } from '@ngx-pwa/local-storage';
import * as moment from 'moment';
import { catchError, finalize, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { StorageKeys, StorageKeysType } from 'src/app/enums/storage-keys.enum';
import { COMMON_APIS, USER_REGISTRATION_APIS } from 'src/app/lookups/api.lookups';
import { APPLICATION_ERRORS } from 'src/app/lookups/error.codes.lookup';
import { DatingPlatform } from 'src/app/modules/user-registration/models/dating-platforms';
import { CacheKeys, CacheService } from 'src/app/services/cache-service.service';
import { ExceptionsService } from 'src/app/services/exceptions.service';
import { HttpUtilService } from 'src/app/services/http-utils.service';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../base/base.service';
import { FreeSlotModel } from '../../calendar/models/free-slot.model';
import { UserRegistrationRoutes } from '../data/user-registration-routes';
import { UserRegistrationRoute } from '../enums/user-registration-route.enum';
import { HeaderService } from '../layout/header/header.service';
import { DummyProfile } from '../models/dummy_profile.model';
import { PersonalInterest } from '../models/personal-interest.model';
import { SelectOption } from '../models/select-option.model';
import { Unmatched } from '../models/unmatched.model';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService extends BaseService<Unmatched> {
  public prefilledUsername: string = null;
  public unmatched: Unmatched;
  public skipLocation: boolean = false;

  public readonly ethnicities: SelectOption[] = [
    { name: 'Asian', selected: false },
    { name: 'African', selected: false },
    { name: 'White', selected: false },
    { name: 'Latino', selected: false },
    { name: 'Black', selected: false },
  ];

  public readonly racks: SelectOption[] = [
    { name: 'Less', selected: false },
    { name: 'Handful', selected: false },
    { name: 'More', selected: false },
  ];
  public readonly asses: SelectOption[] = [
    { name: 'Less', selected: false },
    { name: 'Handful', selected: false },
    { name: 'More', selected: false },
  ];
  public readonly freeSlots: FreeSlotModel[] = [
    { dayOfWeek: 0, startHour: 0, startMinute: 0, endHour: 23, endMinute: 59, startDate: new Date('2023-03-13T06:00:00.000Z') },
    { dayOfWeek: 1, startHour: 0, startMinute: 0, endHour: 23, endMinute: 59, startDate: new Date('2023-03-14T06:00:00.000Z') },
    { dayOfWeek: 2, startHour: 0, startMinute: 0, endHour: 23, endMinute: 59, startDate: new Date('2023-03-15T06:00:00.000Z') },
    { dayOfWeek: 3, startHour: 0, startMinute: 0, endHour: 23, endMinute: 59, startDate: new Date('2023-03-16T06:00:00.000Z') },
    { dayOfWeek: 4, startHour: 0, startMinute: 0, endHour: 23, endMinute: 59, startDate: new Date('2023-03-17T06:00:00.000Z') },
    { dayOfWeek: 5, startHour: 0, startMinute: 0, endHour: 23, endMinute: 59, startDate: new Date('2023-03-18T06:00:00.000Z') },
    { dayOfWeek: 6, startHour: 0, startMinute: 0, endHour: 23, endMinute: 59, startDate: new Date('2023-03-12T06:00:00.000Z') },
  ];

  public resetRequestedFromPrefSwipesPage: boolean = false;

  /***/
  constructor(
    private httpUtilsService: HttpUtilService,
    private cacheService: CacheService,
    private exceptionsService: ExceptionsService,
    private navController: NavController,
    private router: Router,
    public headerService: HeaderService,
    private storage: StorageMap,
  ) {
    super(USER_REGISTRATION_APIS.unmatched, httpUtilsService);
    this.retrieveUnmatchedUserInfo();
    this.skipLocation = JSON.parse(this.cacheService.getLocalStorage(CacheKeys.skipLocation));
  }

  retrieveUnmatchedUserInfo(): void {
    this.unmatched = JSON.parse(localStorage.getItem('unmatched'));
  }

  public override updateLocalEntity(entity: Unmatched): void {
    if (entity) {
      this.unmatched = entity;
      localStorage.setItem('unmatched', JSON.stringify(this.unmatched));
    }
  }

  public lazyLoadRegistrationData(): void {
    forkJoin([this.getDatingPlatforms(), this.getPersonalInterests(), this.getMatchingProfiles()]).subscribe();
  }

  public createUnmatchedUser(phoneNumber: string): Observable<Unmatched> {
    this.setLoading(true);
    return this.httpUtilsService.postRequest<Unmatched>(USER_REGISTRATION_APIS.registration, { phoneNumber }).pipe(
      finalize(() => {
        this.setLoading(false);
      }),
      tap((unmatched) => {
        this.updateLocalEntity(unmatched);
      }),
    );
  }

  public verifyOTP(phoneNumber: string, otp: string): Observable<any> {
    this.setLoading(true);
    this.unmatched.otp.code = otp;
    this.unmatched.verified = true;
    // return this.httpUtilsService.postRequest<Unmatched>( USER_REGISTRATION_APIS.verify_otp, { phoneNumber, otp } )
    return of(this.unmatched).pipe(
      tap((unmatched) => {
        this.updateLocalEntity(unmatched);
      }),
      finalize(() => {
        this.setLoading(false);
      }),
    );
  }

  public getPersonalInterests(): Observable<PersonalInterest[]> {
    return this.getDataFromIndexDB<PersonalInterest>(StorageKeys.PersonalInterests, USER_REGISTRATION_APIS.personal_interests);
  }

  public uploadImages(images): Observable<{ url: string }[]> {
    this.setLoading(true);
    return this.httpUtilsService.postRequest<{ url: string }[]>(COMMON_APIS.upload, { files: images }).pipe();
  }

  public getDatingPlatforms(): Observable<DatingPlatform[]> {
    return this.getDataFromIndexDB<DatingPlatform>(StorageKeys.DatingPlatforms, USER_REGISTRATION_APIS.dating_platforms);
  }

  public getMatchingProfiles(): Observable<DummyProfile[]> {
    this.setLoading(true);
    return this.storage.get(StorageKeys.MatchingProfiles + this.unmatched?._id).pipe(
      switchMap((localResponse: DummyProfile[]) => {
        if (localResponse) {
          return of(localResponse);
        } else {
          return this.httpUtilsService.postRequest<DummyProfile[]>(USER_REGISTRATION_APIS.matching_profiles, this.unmatched).pipe(
            map((_matchingProfiles) => {
              return _matchingProfiles.map((matchingProfile, matchingProfileIndex) => {
                return {
                  ...matchingProfile,
                  name: matchingProfile.firstName + ' ' + matchingProfile.lastName,
                  age: moment().diff(new Date(matchingProfile.birthDate), 'years'),
                  images: matchingProfile.images?.map((image) => {
                    if (image.includes('http') || image.includes('https')) {
                      return image;
                    }
                    return environment.s3Url + image;
                  }),
                  interests: matchingProfile.personalInterests.map((int) => int.name),
                  index: matchingProfileIndex,
                };
              });
            }),
            tap((backendResponse) => {
              this.storage.set(StorageKeys.MatchingProfiles + this.unmatched?._id, backendResponse).subscribe(() => {});
            }),
          );
        }
      }),
      finalize(() => {
        this.setLoading(false);
      }),
    );
  }

  public resendOTP(): Observable<any> {
    this.setLoading(true);
    return this.httpUtilsService.postRequest(USER_REGISTRATION_APIS.resendOTP, { phoneNumber: this.unmatched.phoneNumber }).pipe(
      tap((data) => {
        this.updateLocalEntity(data);
      }),
      finalize(() => {
        this.setLoading(false);
      }),
    );
  }

  public rangeMeterCalculations(value): number {
    let sum = 0;
    sum += this.calculateGoalsInterest(value ?? this.unmatched?.datingPreferences);
    sum += this.calculateAgeHeight(value ?? this.unmatched?.datingPreferences);
    sum += this.calculateFaceEthnicity(value ?? this.unmatched?.datingPreferences);
    sum += this.calculaterackAss(value ?? this.unmatched?.datingPreferences);
    return sum ? Math.ceil(sum / 4) : 0;
  }

  public calculateGoalsInterest(obj): number {
    let sum: number = 0;
    sum += obj?.friends ? 50 : 0;
    sum += obj?.relationships ? 50 : 0;
    sum += 100 - (obj?.interests || obj?.interests == 0 ? obj.interests : 30);
    return sum / 2;
  }

  public calculateAgeHeight(obj): number {
    let sum: number = 0;
    sum += (obj?.age?.upper || obj?.age?.upper == 0) && (obj?.age?.lower || obj?.age?.lower == 0) ? +obj.age.upper - +obj.age.lower : 80 - 20;
    sum += (((obj?.height?.upper || obj?.height?.upper == 0) && (obj?.height?.lower || obj?.height?.lower == 0) ? +obj.height.upper - +obj.height.lower : 5.7 - 4.3) / 3) * 100;
    return sum / 2;
  }

  public calculateFaceEthnicity(obj): number {
    let sum: number = 0;
    sum += ((10 - (obj?.face || obj?.face == 0 ? obj.face : 6)) / 10) * 50;
    sum += ((obj?.ethnicity?.length ? obj.ethnicity.length : 0) / this.ethnicities.length) * 50;
    return sum;
  }

  public calculaterackAss(obj): number {
    let sum: number = 0;
    sum += ((obj?.rack?.length ? obj.rack.length : 0) / this.racks.length) * 50;
    sum += ((obj?.ass?.length ? obj.ass.length : 0) / this.asses.length) * 50;
    return sum;
  }

  public updateAccountDetails(accountDetails: Unmatched): Observable<Unmatched> {
    let isTouched = false;
    this.setLoading(true);
    delete accountDetails.confirmPassword;

    Object.keys(accountDetails).some((key) => {
      if (accountDetails[key] !== this.unmatched[key]) {
        isTouched = true;
        return true;
      }
    });

    if (isTouched) {
      return this.httpUtilsService.postRequest<any>(USER_REGISTRATION_APIS.account_details + this.unmatched._id, { ...accountDetails, lastActiveRoute: 'birthday' }).pipe(
        tap((response) => {
          this.updateLocalEntity(response.unmatched);
          this.cacheService.cacheUserData(response.user, response.access_token);
        }),
        finalize(() => {
          this.setLoading(false);
        }),
      );
    } else {
      return of(this.unmatched);
    }
  }

  public routeToNextPage(unmatchedInfo: any, url: string = '', updateLocalStorageOnly: boolean = true): Observable<Unmatched> {
    let isTouched = false;

    Object.keys(unmatchedInfo).some((key) => {
      if (unmatchedInfo[key] !== this.unmatched[key] && JSON.stringify(unmatchedInfo[key]) !== JSON.stringify(this.unmatched[key])) {
        isTouched = true;
        return true;
      }
    });

    const updatedInfo = { ...this.unmatched, ...unmatchedInfo, lastActiveRoute: url };

    if (isTouched && !updateLocalStorageOnly) {
      return this.update(updatedInfo).pipe(
        tap((value: Unmatched) => {
          this.navController.navigateForward(UserRegistrationRoute[url], { animated: true, animationDirection: 'forward' });
        }),
        catchError((error) => {
          this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.SERVER_ERROR]);
          return of(this.unmatched);
        }),
      );
    } else {
      this.navController.navigateForward(UserRegistrationRoute[url], { animated: true, animationDirection: 'forward' });
      this.updateLocalEntity(updatedInfo);
      return of(this.unmatched);
    }
  }

  public routeBackinRegistrationFlow() {
    const currentRouteIndex = UserRegistrationRoutes.indexOf(this.router.url);
    let redirectToUrl: string;
    let skipIndex = 1;

    if (this.router.url === UserRegistrationRoute['billing']) {
      redirectToUrl = UserRegistrationRoute['newAccounts'];
    } else if (this.router.url === UserRegistrationRoute['changePlatformsPassword']) {
      redirectToUrl = UserRegistrationRoute['accessCodes'];
    } else if (this.router.url === UserRegistrationRoute['existingAccounts']) {
      redirectToUrl = UserRegistrationRoute['setupDatingAccount'];
    } else if (currentRouteIndex > 0) {
      if (this.skipLocation && this.router.url === UserRegistrationRoute['maps']) {
        skipIndex += 1;
      }
      redirectToUrl = UserRegistrationRoutes[currentRouteIndex - skipIndex];
    }

    if (redirectToUrl) {
      this.updateLocalEntity({ ...this.unmatched, lastActiveRoute: redirectToUrl });
      this.navController.navigateBack(redirectToUrl, { animated: true, animationDirection: 'back' });
    } else {
      this.navController.back({ animated: true, animationDirection: 'back' });
    }
  }

  private getDataFromIndexDB<T>(storageKey: StorageKeysType, requestUrl: string): Observable<T[]> {
    this.setLoading(true);
    return this.storage.get(storageKey).pipe(
      switchMap((localResponse: T[]) => {
        if (localResponse) {
          return of(localResponse);
        } else {
          return this.httpUtilsService.getRequest<T[]>(requestUrl).pipe(
            tap((backendResponse) => {
              this.storage.set(storageKey, backendResponse).subscribe(() => {});
            }),
          );
        }
      }),
      finalize(() => {
        this.setLoading(false);
      }),
    );
  }

  public saveLikesDislikes(): Observable<Record<string, boolean>> {
    return this.httpUtilService.postRequest(USER_REGISTRATION_APIS.saveProps + this.unmatched._id, {
      likes: this.unmatched?.likes || null,
      disLikes: this.unmatched?.disLikes || null,
    });
  }
}
