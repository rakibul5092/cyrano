import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialDatesSelectGuruComponent } from './potential-dates-select-guru.component';

describe('PotentialDatesSelectGuruComponent', () => {
  let component: PotentialDatesSelectGuruComponent;
  let fixture: ComponentFixture<PotentialDatesSelectGuruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PotentialDatesSelectGuruComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialDatesSelectGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
