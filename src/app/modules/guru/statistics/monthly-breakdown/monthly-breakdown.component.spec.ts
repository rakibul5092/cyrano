import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonthlyBreakdownComponent } from './monthly-breakdown.component';

describe('MonthlyBreakdownComponent', () => {
  let component: MonthlyBreakdownComponent;
  let fixture: ComponentFixture<MonthlyBreakdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyBreakdownComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
