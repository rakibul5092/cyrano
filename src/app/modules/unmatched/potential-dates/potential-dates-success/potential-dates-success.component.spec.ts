import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialDatesSuccessComponent } from './potential-dates-success.component';

describe('PotentialDatesSuccessComponent', () => {
  let component: PotentialDatesSuccessComponent;
  let fixture: ComponentFixture<PotentialDatesSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PotentialDatesSuccessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialDatesSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
