import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoalsAndInterestsComponent } from './goals-and-interests.component';

describe('GoalsAndInterestsComponent', () => {
  let component: GoalsAndInterestsComponent;
  let fixture: ComponentFixture<GoalsAndInterestsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GoalsAndInterestsComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalsAndInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
