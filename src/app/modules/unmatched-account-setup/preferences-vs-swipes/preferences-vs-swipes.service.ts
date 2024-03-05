import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as PreferencesSwipesModules from 'src/app/constants/PreferencesSwipesModules';
import { USER_REGISTRATION_APIS } from 'src/app/lookups/api.lookups';
import { UserRegistrationService } from '../../user-registration/services/user-registration.service';
import SelectableItem from './selectable-items.values';

@Injectable({
  providedIn: 'root',
})
export class PreferencesVsSwipesService {
  public selectables = {
    ageAndHeight: new SelectableItem().selectableItem,
    faceAndEthnicity: new SelectableItem().selectableItem,
    rackAndAss: new SelectableItem().selectableItem,
  };

  public selectedTabItemIndex: number = null;
  private moduleSource = new BehaviorSubject<string>(PreferencesSwipesModules.AgeAndHeight.name);
  public currentModule = this.moduleSource.asObservable();

  constructor(private http: HttpClient, private userRegistrationService: UserRegistrationService) {}

  public faceAndEthnicityItems = [];
  public rackAndAssItems = [];

  public changeCurrentModule(moduleName: string): void {
    this.moduleSource.next(moduleName);
  }

  public changeSelectedItem(itemindex: number): void {
    this.selectedTabItemIndex = itemindex;
    for (const selectableTab in this.selectables) {
      if (Object.prototype.hasOwnProperty.call(this.selectables, selectableTab)) {
        const selectableTabItems = this.selectables[selectableTab];
        selectableTabItems.map((item, index) => {
          item.selected = index === itemindex;
        });
      }
    }
  }

  public getData(): Observable<Object> {
    const id = this.userRegistrationService.unmatched?._id;
    if (!id) return;
    return this.http.get(`${USER_REGISTRATION_APIS.datingPreferences}${id}`);
  }

  public postDatingPreferences(body: any): Observable<HttpEvent<Object>> {
    const id = this.userRegistrationService.unmatched?._id;
    if (!id) return;
    return this.http.post(`${USER_REGISTRATION_APIS.datingPreferences}${id}`, body, { observe: 'response' });
  }
}
