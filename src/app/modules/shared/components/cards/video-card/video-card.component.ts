import { Component, Input } from '@angular/core';
import { VideoModel } from './video.model';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent {
  @Input() video: VideoModel;
  public preload: string = 'auto';
  public api: VgApiService;
  public inPlayMode: boolean;
  public inProgress: boolean;
  public progress: number = 0;

  public onPlayerReady(api: VgApiService): void {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.play.subscribe((value) => {
      this.inPlayMode = true;
    });
    this.api.getDefaultMedia().subscriptions.pause.subscribe((value) => {
      this.progress = Math.round((100 * this.api.time.current) / this.api.time.total);
      this.api.fsAPI.exit();
    });
  }

  public onPlyOverlayClick(): void {
    this.inPlayMode = !this.inPlayMode;
  }
}
