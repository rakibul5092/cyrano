import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingDateCardComponent } from './upcoming-date-card.component';

describe('UpcomingDateCardComponent', () => {
  let component: UpcomingDateCardComponent;
  let fixture: ComponentFixture<UpcomingDateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpcomingDateCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingDateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
