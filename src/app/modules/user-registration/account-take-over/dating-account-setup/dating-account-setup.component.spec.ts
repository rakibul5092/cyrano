import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatingAccountSetupComponent } from './dating-account-setup.component';

describe('DatingAccountSetupComponent', () => {
  let component: DatingAccountSetupComponent;
  let fixture: ComponentFixture<DatingAccountSetupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DatingAccountSetupComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DatingAccountSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
