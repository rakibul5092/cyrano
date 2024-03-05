import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { AlertToastElement } from '../interfaces/alert/alert.interface';
import { AlertTypes } from '../lookups/app.lookups';
import { ExceptionType } from '../lookups/error.codes.lookup';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private mouseHover: boolean = false;
  private timeoutFunction: ReturnType<typeof setTimeout> = null;
  private defaultToastDuration = 2000;

  /***/
  constructor(private toastController: ToastController, private translateService: TranslateService) {}

  /**
   * Method to create an alert toast
   *
   * @param title value or translation key
   * @param msg value or translation key
   * @param type Type of Error
   * @param stayOnHover Boolean to allow alert to stay on hover
   * @param buttonName Button name label
   * @param onButtonClick Function to button click handle
   */
  public async alert(title: string = '', msg: string, type: AlertTypes, stayOnHover: boolean = true, buttonName: string = null, onButtonClick: Function = () => {}): Promise<void> {
    if (stayOnHover) {
      const alertToastElement = await this.alertWithParams(title, msg, type, {
        duration: 0,
        button: {
          name: buttonName,
          onClick: onButtonClick,
        },
        onMouseEnter: () => {
          this.onMouseEnter(alertToastElement);
        },
        onMouseLeave: () => {
          this.onMouseLeave(alertToastElement);
        },
      });
      this.mouseHover = true;
      this.onMouseLeave(alertToastElement);
      return;
    }
    await this.alertForDuration(title, msg, type, this.defaultToastDuration, onButtonClick);
  }

  /**
   * Method to create an alert toast with custom parameters
   *
   * @param title value or translation key
   * @param msg value or translation key
   * @param type Type of Error
   * @param duration Duration of an alert toast
   * @param onButtonClick Function to button click handle
   * @param params Custom parameters for the toast controller
   * @returns Necessary functions to handle the alert toast
   */

  public async alertForDuration(title: string = '', msg: string, type: AlertTypes, duration: number, onButtonClick: Function = () => {}): Promise<AlertToastElement> {
    return await this.alertWithParams(title, msg, type, { duration, onMouseEnter: () => {}, onMouseLeave: () => {}, button: { name: null, onClick: onButtonClick } });
  }

  /**
   * Method to create an alert toast with custom parameters
   *
   * @param title value or translation key
   * @param msg value or translation key
   * @param type Type of Error
   * @param params Custom parameters for a toast controller
   * @returns Necessary functions to handle the alert toast
   */

  public async alertWithParams(
    title: string = '',
    msg: string,
    type: AlertTypes,
    params: { duration: number; onMouseEnter: Function; onMouseLeave: Function; button: { onClick: Function; name: string } },
  ): Promise<AlertToastElement> {
    function buttonOnClick() {
      params.button.onClick();
    }
    function onMouseEnter() {
      params.onMouseEnter();
    }
    function onMouseLeave() {
      params.onMouseLeave();
    }
    const translations = await lastValueFrom(this.translateService.get([title, msg, 'OK']));
    const toast = await this.toastController.create({
      header: translations && translations[title] ? translations[title] : title,
      message: translations && translations[msg] ? translations[msg] : msg,
      position: 'bottom',
      color: type,
      duration: params.duration,
      buttons: [
        {
          // eslint-disable-next-line prettier/prettier
          text: params.button.name || (translations && translations.OK ? translations.OK : 'Ok'),
          role: 'cancel',
          handler: buttonOnClick,
        },
      ],
      htmlAttributes: {
        onmouseenter: onMouseEnter,
        onmouseleave: onMouseLeave,
      },
    });
    toast.present();

    return {
      dismiss: () => {
        if (params.duration === 0) toast.dismiss();
      },
    };
  }

  /**
   * Alert an Exception
   *
   * @param exception Exception
   * @param stayOnHover Boolean to allow alert to stay on hover
   * @param buttonName Button name label
   * @param onButtonClick Function to button click handle
   */

  public async alertException(exception: ExceptionType, stayOnHover: boolean = true, buttonName: string = null, onButtonClick: Function = () => {}): Promise<void> {
    await this.alert(exception.title, exception.message, AlertTypes.error, stayOnHover, buttonName, onButtonClick);
  }

  /**
   * Method is invoked onmouseleave event
   * @param alertToastElement Alert Toast Element
   */

  private onMouseLeave(alertToastElement: AlertToastElement): void {
    if (this.mouseHover) {
      this.timeoutFunction = setTimeout(() => {
        this.mouseHover = false;
        if (!this.mouseHover && alertToastElement) alertToastElement.dismiss();
      }, 2000);
    }
  }

  /**
   * Method is invoked onmouseenter event
   * @param alertToastElement Alert Toast Element
   */

  private onMouseEnter(alertToastElement: AlertToastElement): void {
    this.mouseHover = true;
    if (this.timeoutFunction) clearTimeout(this.timeoutFunction);
  }
}
