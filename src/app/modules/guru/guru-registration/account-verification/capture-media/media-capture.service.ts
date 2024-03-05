import { Injectable } from '@angular/core';
import { IKycDocument } from 'src/app/models/kyc-document';

@Injectable({
  providedIn: 'root',
})
export class MediaCaptureService {
  public verificationDocument: 'driving license' | 'visa or passport' = 'driving license';
  public capturedFront: boolean = false;
  public capturedBack: boolean = false;

  public drivingLicense: IKycDocument = { front: '', back: '' };
  public internationalPassport: IKycDocument = { front: '', back: '' };

  constructor() {}
}
