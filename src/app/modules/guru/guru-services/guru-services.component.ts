import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guru-service',
  template: ` <ion-content>
      <ion-router-outlet></ion-router-outlet>
    </ion-content>
    <ion-footer><app-guru-services-footer [activeTab]="activeTab"></app-guru-services-footer></ion-footer>`,
})
export class GuruServicesComponent implements OnInit {
  public activeTab: string;
  public activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // Initialize first based on route, for some reason only snaphot of the activated route is providing the correct data so Observables are avoided
    this.activeTab = this.activatedRoute.snapshot.firstChild?.data?.activeTab;
  }
}
