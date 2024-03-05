import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyCalendarAccountsPage } from './my-calendar-accounts.page';

describe('MyCalendarAccountsPage', () => {
  let component: MyCalendarAccountsPage;
  let fixture: ComponentFixture<MyCalendarAccountsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MyCalendarAccountsPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MyCalendarAccountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
