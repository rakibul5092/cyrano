import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonthlyGoalCardComponent } from './monthly-goal-card.component';

describe('MonthlyGoalCardComponent', () => {
  let component: MonthlyGoalCardComponent;
  let fixture: ComponentFixture<MonthlyGoalCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyGoalCardComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyGoalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
