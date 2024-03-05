import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ImageCropperService, PopupModalService } from 'nextsapien-component-lib';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Subscription, firstValueFrom } from 'rxjs';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { ICONS } from 'src/app/theme/theme.icons';
import { AlertTypes } from '../../../lookups/app.lookups';
import { AlertService } from '../../../services/alert.service';
import { HeaderService } from '../layout/header/header.service';
import { Image } from '../models/image.model';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-my-photos',
  templateUrl: './my-photos.component.html',
  styleUrls: ['./my-photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyPhotosComponent implements OnInit {
  public imgSrcArray: Image[] = [];
  public loading$ = this.userRegistrationService.loading;
  public skeletonLoaders: boolean[] = [false, false, false, false];
  public imageBeingLoaded: boolean = false;
  public imageUploadWarning: boolean = false;
  public icons: (typeof ICONS)['light'];
  private arrayOfFiles: Image[] = [];
  private croppedImages: Image[];
  private readonly validFileExtensions = ['jpg', 'jpeg', 'bmp', 'gif', 'png'];
  private subscriptions: Subscription[] = [];

  /**
   * @param alertService
   * @param userRegistrationService
   * @param headerService
   * @param cdr
   * @param imageCompress
   * @param commonUtilService
   * @param imageCropperService
   */
  constructor(
    private alertService: AlertService,
    private userRegistrationService: UserRegistrationService,
    private headerService: HeaderService,
    private cdr: ChangeDetectorRef,
    private imageCompress: NgxImageCompressService,
    private commonUtilService: CommonUtilService,
    public modalFactoryService: PopupModalService,
    private imageCropperService: ImageCropperService,
  ) {}

  ngOnInit(): void {
    this.imgSrcArray = this.userRegistrationService?.unmatched?.images;
    this.icons = this.commonUtilService.icons;
  }

  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(56.25);
  }

  public selectImage(): void {
    this.imageCompress.uploadMultipleFiles().then(async (arrayOfFiles: Image[]) => {
      let containsDuplicatedImages: boolean;
      let containsInvalidFileExtension: boolean;
      arrayOfFiles.forEach((file) => {
        if (this.imgSrcArray.findIndex((imgSrc) => imgSrc.fileName === file.fileName) > -1) {
          containsDuplicatedImages = true;
        }

        const fileNameArray = file.fileName.split('.');
        const fileExtension = fileNameArray[fileNameArray.length - 1];

        if (this.validFileExtensions.indexOf(fileExtension) < 0) {
          containsInvalidFileExtension = true;
        }
      });
      if (containsDuplicatedImages) {
        this.alertService.alert('GALLERY.IMAGE_UPLOADING', 'GALLERY.PHOTO_ALREADY_UPLOADED', AlertTypes.error);
      } else if (containsInvalidFileExtension) {
        this.alertService.alert('GALLERY.IMAGE_UPLOADING', 'GALLERY.INVALID_FILE_FORMAT', AlertTypes.error);
      } else {
        const croppedImages: string[] = await firstValueFrom(this.imageCropperService.openImageCropper(arrayOfFiles?.map((file) => file.image)));
        this.croppedImages = [];
        croppedImages.forEach((image, index) => {
          this.croppedImages.push({ image, fileName: arrayOfFiles[index].fileName });
        });
        this.parseUploadedImages(arrayOfFiles);
      }
    });
  }

  private compressImage(file: Image, lastIndex: number): void {
    this.imageCompress
      .compressFile(file.image, file.orientation, 50, 50) // 50% ratio, 50% quality
      .then(
        (compressedImage) => {
          if (this.skeletonLoaders[lastIndex]) {
            if (this.imageCompress.byteCount(compressedImage) > 700000) {
              this.compressImage(
                {
                  image: compressedImage,
                  fileName: file.fileName,
                },
                lastIndex,
              );
            } else {
              if (this.skeletonLoaders[lastIndex]) {
                this.imgSrcArray.push({
                  image: compressedImage,
                  fileName: file.fileName,
                });
              }
              this.skeletonLoaders[lastIndex] = false;
              this.userRegistrationService.updateLocalEntity(this.userRegistrationService?.unmatched);
              this.updateView();
            }
          }
        },
        () => {
          this.skeletonLoaders[lastIndex] = false;
          this.alertService.alert('GALLERY.IMAGE_UPLOADING', 'GALLERY.UPLOAD_FAILED', AlertTypes.error);
        },
      );
  }

  /**
   * Continue to next route component
   */
  public onContinue(): void {
    if (this.imgSrcArray.length >= 2) {
      this.userRegistrationService.routeToNextPage({ images: this.imgSrcArray.filter((img) => img) }, 'datingPreferences', true);
    }
  }

  public removeImage(index: number): void {
    if (this.imgSrcArray[index]) {
      this.imgSrcArray.splice(index, 1);
    } else {
      this.skeletonLoaders[index] = false;
    }
    this.updateView();
    this.userRegistrationService.updateLocalEntity(this.userRegistrationService?.unmatched);
  }

  public handleModalDismiss(): void {
    this.arrayOfFiles = [];
    this.modalFactoryService.hide();
    this.cdr.detectChanges();
  }

  public handleModalConfirm(): void {
    this.modalFactoryService.hide();
    this.cdr.detectChanges();
    this.parseUploadedImages(this.arrayOfFiles);
  }

  private updateView(): void {
    this.imageBeingLoaded = this.skeletonLoaders.indexOf(true) > -1;
    this.cdr.detectChanges();
  }

  private parseUploadedImages(arrayOfFiles: Image[]): void {
    arrayOfFiles.some((file, index) => {
      const lastIndex = this.imgSrcArray.length + index;
      if (lastIndex >= 4) {
        this.alertService.alert('GALLERY.IMAGE_UPLOADING', 'GALLERY.MAXIMUM_UPLOAD_ERROR', AlertTypes.error);
        return true;
      } else {
        // Show skeleton loader for the number of selected files
        file.image = this.croppedImages.find((value) => value.fileName === file.fileName)?.image;
        const imageByteCount = this.imageCompress.byteCount(file.image);
        if (imageByteCount > 2000000 && this.arrayOfFiles?.indexOf(file) < 0) {
          if (!this.modalFactoryService.isOpenStatus()) {
            this.arrayOfFiles = [];

            const obj = {
              icon: this.icons.info,
              confirmButton: 'UNMATCHED_USER.UPLOAD_ANYWAY',
              cancelButton: 'UNMATCHED_USER.CANCEL',
              title: 'UNMATCHED_USER.UPLOAD_WARNING',
              message: 'UNMATCHED_USER.UPLOAD_WARNING_MESSAGE',
            };
            const ref = this.modalFactoryService.getInstance();
            this.modalFactoryService.setValues(obj);
            this.subscriptions.push(ref.instance.modalConfirm.subscribe(() => this.handleModalConfirm()));
            this.subscriptions.push(ref.instance.modalDismiss.subscribe(() => this.handleModalDismiss()));
            this.modalFactoryService.show();
            ref.changeDetectorRef.detectChanges();
            this.cdr.detectChanges();
          }
          this.arrayOfFiles.push(file);
        } else {
          this.skeletonLoaders[lastIndex] = true;
          this.compressImage(file, lastIndex);
        }
        this.updateView();
      }
    });
  }

  ionViewWillLeave(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
