import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuruRegistrationHeaderComponent } from './guru-registration-header.component';

describe('GuruRegistrationHeaderComponent', () => {
  let component: GuruRegistrationHeaderComponent;
  let fixture: ComponentFixture<GuruRegistrationHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GuruRegistrationHeaderComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GuruRegistrationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
