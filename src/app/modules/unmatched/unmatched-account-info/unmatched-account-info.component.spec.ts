import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnmatchedAccountInfoComponent } from './unmatched-account-info.component';

describe('UnmatchedAccountInfoComponent', () => {
  let component: UnmatchedAccountInfoComponent;
  let fixture: ComponentFixture<UnmatchedAccountInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnmatchedAccountInfoComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(UnmatchedAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
