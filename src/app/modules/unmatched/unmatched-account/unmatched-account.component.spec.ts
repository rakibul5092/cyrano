import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnmatchedAccountComponent } from './unmatched-account.component';

describe('UnmatchedAccountComponent', () => {
  let component: UnmatchedAccountComponent;
  let fixture: ComponentFixture<UnmatchedAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnmatchedAccountComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(UnmatchedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
