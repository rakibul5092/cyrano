import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { MediaCaptureService } from './media-capture.service';

@Component({
  selector: 'app-capture-media',
  templateUrl: './capture-media.page.html',
  styleUrls: ['./capture-media.page.scss'],
})
export class CaptureMediaPage implements AfterViewInit {
  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('objectTrackerCanvas') objectTrackerCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('cameraClip') cameraClip: ElementRef<HTMLElement>;

  public automaticCapture: boolean = true;
  public autoCaptured: boolean = false;
  public manualCaptured: boolean = false;
  public captureSide: string = 'front';
  public objectTrackingCtx: CanvasRenderingContext2D;

  public loading: boolean = true;
  public canAccessCamera: boolean = true;
  public isbrowserSupported: boolean = true;

  private target: number[][] = [
    [44, 235],
    [676, 235],
    [676, 712],
    [44, 712],
  ];

  private objectBoundingBox: number[];
  private mediaStream: MediaStream;
  private frameDetector: number;
  private mediaAspectRatio: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public mediaCaptureService: MediaCaptureService,
    private navCtrl: NavController,
    private alertController: AlertController,
  ) {
    this.captureSide = this.activatedRoute.snapshot.paramMap.get('side');
  }

  ngAfterViewInit(): void {
    if (this.automaticCapture) {
      setTimeout(() => this.turnOnMediaCapture(), 5000);
    }
  }

  ionViewWillLeave = (): void => this.stopStream();

  public back(): void {
    this.navCtrl.back();
  }

  public setAutomaticCapture(val: boolean): void {
    this.automaticCapture = val;
  }

  public async turnOnMediaCapture(): Promise<void> {
    if (navigator.mediaDevices.getUserMedia) {
      try {
        const video = this.video.nativeElement as HTMLVideoElement;
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { width: 720, height: 1200, facingMode: 'environment' },
        });
        video.srcObject = this.mediaStream;
        video.onloadedmetadata = (): void => {
          const size = this.mediaStream.getTracks()[0].getSettings();
          video.width = size.width;
          video.height = size.height;
          this.objectTrackerCanvas.nativeElement.width = size.width;
          this.objectTrackerCanvas.nativeElement.height = size.height;
          this.mediaAspectRatio = size.width / size.height;
          this.adjustVideoHeight();
          video.play();
          this.updateTarget();
          this.adjustMaskArea();
          this.objectTrackingCtx = this.objectTrackerCanvas.nativeElement.getContext('2d');
          this.objectTrackingCtx.strokeStyle = '#ff0000';
          this.objectTrackingCtx.lineWidth = 5;
          this.predictWithCocoSsd(video);

          window.addEventListener('resize', this.adjustCamera.bind(this));
        };
      } catch (e) {
        this.canAccessCamera = false;
      }
    } else {
      this.isbrowserSupported = false;
      this.alertController
        .create({
          header: 'Browser support issue',
          message: 'Your browser does not support this feature please use another one',
          buttons: ['ok'],
          cssClass: 'alert',
        })
        .then((alert) => alert.present());
    }
  }

  public captureManual(): void {
    if (this.automaticCapture) {
      return;
    }
    this.objectTrackingCtx.clearRect(0, 0, this.objectTrackerCanvas.nativeElement.width, this.objectTrackerCanvas.nativeElement.height);
    if (!this.objectBoundingBox || this.objectBoundingBox.length < 1) {
      return;
    }
    cancelAnimationFrame(this.frameDetector);
    this.manualCaptured = true;
    this.capture(this.objectTrackingCtx, this.video.nativeElement, this.objectBoundingBox);
    this.stopStream();
  }

  public recapture(): void {
    this.manualCaptured = false;
    this.turnOnMediaCapture();
  }

  public captureNext(): void {
    if (this.automaticCapture === false) {
      this.saveImage(this.objectTrackingCtx, this.objectBoundingBox);
    }
    if (this.captureSide === 'front') {
      this.router.navigate(['../', 'back'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../../../'], { relativeTo: this.activatedRoute });
    }
  }

  private async predictWithCocoSsd(video: HTMLVideoElement): Promise<void> {}

  private async detectFrame(model, video): Promise<void> {
    const predictions = await model.detect(video);
    this.loading = false;
    this.objectTrackingCtx.clearRect(0, 0, this.objectTrackerCanvas.nativeElement.width, this.objectTrackerCanvas.nativeElement.height);
    if (predictions.length > 0) {
      for (const prediction of predictions) {
        if (prediction.class !== 'person') {
          const boundingBox = prediction.bbox;
          this.objectBoundingBox = boundingBox;
          if (this.automaticCapture) {
            if (this.withinTarget(boundingBox) && this.fillTarget(boundingBox)) {
              this.objectTrackingCtx.clearRect(0, 0, this.objectTrackerCanvas.nativeElement.width, this.objectTrackerCanvas.nativeElement.height);
              this.autoCaptureObject(this.objectTrackingCtx, video, boundingBox);
              this.stopStream();
              return;
            }
          }
          this.objectTrackingCtx.strokeRect(boundingBox[0], boundingBox[1], boundingBox[2], boundingBox[3]);
          break;
        }
      }
    }
    this.frameDetector = requestAnimationFrame(() => this.detectFrame(model, video));
  }

  private autoCaptureObject(ctx: CanvasRenderingContext2D, video: HTMLVideoElement, points: number[]): void {
    this.autoCaptured = true;
    this.capture(ctx, video, points);
    this.stopStream();
    this.saveImage(ctx, points);
  }

  private capture(ctx: CanvasRenderingContext2D, video: HTMLVideoElement, points: number[]): void {
    ctx.drawImage(video, points[0], points[1], points[2], points[3], points[0], points[1], points[2], points[3]);
    if (this.captureSide === 'front') {
      this.mediaCaptureService.capturedFront = true;
    } else if (this.captureSide === 'back') {
      this.mediaCaptureService.capturedBack = true;
    }
    this.saveImage(ctx, points);
  }

  private saveImage(ctx: CanvasRenderingContext2D, points: number[]): void {
    const imageData = ctx.getImageData(points[0], points[1], points[2], points[3]);
    const onTheflyCanvas = document.createElement('canvas');
    onTheflyCanvas.width = imageData.width;
    onTheflyCanvas.height = imageData.height;
    const onTheFlyCtx = onTheflyCanvas.getContext('2d');
    onTheFlyCtx.putImageData(imageData, 0, 0);
    this.mediaCaptureService.drivingLicense[this.captureSide] = onTheflyCanvas.toDataURL('image/jpg', 1);
  }

  private stopStream(): void {
    this.mediaStream.getTracks().forEach((track) => track.stop());
  }

  private withinTarget(bbox: number[]): boolean {
    const w = bbox[0] + bbox[2];
    const h = bbox[1] + bbox[3];
    return bbox[0] >= this.target[0][0] && bbox[1] > this.target[0][1] && w <= this.target[2][0] && h <= this.target[2][1];
  }

  private fillTarget(bbox: number): boolean {
    const targetHeight = this.target[0][1] - this.target[3][1];
    const width = this.video.nativeElement.width - 88;
    return width - bbox[2] < 44 || targetHeight - bbox[3] < 44;
  }

  private updateTarget(): void {
    const width = this.video.nativeElement.width;
    this.target[1][0] = width - 44;
    this.target[2][0] = width - 44;
  }

  // p1: 24, 120  p2: 366 120 p3: 24, 348 p4: 366 348
  private adjustMaskArea(): void {
    const scaleX = this.video.nativeElement.clientWidth / this.video.nativeElement.width;
    const scaleY = this.video.nativeElement.clientHeight / this.video.nativeElement.height;
    const point = this.target;
    const p1x = point[0][0] * scaleX;
    const p1 = `${p1x}px ${point[0][1] * scaleY}px`;
    const p2 = `${point[1][0] * scaleX}px ${point[1][1] * scaleY}px`;
    const p3 = `${point[2][0] * scaleX}px ${point[2][1] * scaleY}px`;
    const p4 = `${point[3][0] * scaleX}px ${point[3][1] * scaleY}px`;
    this.cameraClip.nativeElement.style.clipPath = `polygon(0 0, 0 100%, ${p1x}px 100%, ${p1}, ${p2}, ${p3}, ${p4}, ${p1x}px 100%, 100% 100%, 100% 0)`;
  }

  /**
   * @method void Adjust the height of video based on width returned from the getUserMedia
   */
  private adjustVideoHeight(): void {
    const video = this.video.nativeElement as HTMLVideoElement;

    video.style.height = `${video.clientWidth / this.mediaAspectRatio}px`;
  }

  /**
   * @method void Adjust the clip region of the video displaying what is coming from the camera
   */
  private adjustCamera(): void {
    this.adjustVideoHeight();
    this.adjustMaskArea();
  }
}
