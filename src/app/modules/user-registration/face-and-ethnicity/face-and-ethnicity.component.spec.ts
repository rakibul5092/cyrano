import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaceAndEthnicityComponent } from './face-and-ethnicity.component';

describe('FaceAndEthnicityComponent', () => {
  let component: FaceAndEthnicityComponent;
  let fixture: ComponentFixture<FaceAndEthnicityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FaceAndEthnicityComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FaceAndEthnicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
