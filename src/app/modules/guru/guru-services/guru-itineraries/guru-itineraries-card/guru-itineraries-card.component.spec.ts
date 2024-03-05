import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuruItinerariesCardComponent } from './guru-itineraries-card.component';

describe('GuruItinerariesCardComponent', () => {
  let component: GuruItinerariesCardComponent;
  let fixture: ComponentFixture<GuruItinerariesCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GuruItinerariesCardComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GuruItinerariesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
