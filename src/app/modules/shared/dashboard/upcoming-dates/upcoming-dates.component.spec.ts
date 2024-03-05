import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingDatesComponent } from './upcoming-dates.component';

describe('UpcomingDatesComponent', () => {
  let component: UpcomingDatesComponent;
  let fixture: ComponentFixture<UpcomingDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpcomingDatesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
