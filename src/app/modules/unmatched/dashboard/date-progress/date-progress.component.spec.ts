import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateProgressComponent } from './date-progress.component';

describe('DateProgressComponent', () => {
  let component: DateProgressComponent;
  let fixture: ComponentFixture<DateProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateProgressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
