import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialDatesHomeComponent } from './potential-dates-home.component';

describe('PotentialDatesHomeComponent', () => {
  let component: PotentialDatesHomeComponent;
  let fixture: ComponentFixture<PotentialDatesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PotentialDatesHomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialDatesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
