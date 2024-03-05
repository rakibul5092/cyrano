import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialDatesComponent } from './potential-dates.component';

describe('PotentialDatesComponent', () => {
  let component: PotentialDatesComponent;
  let fixture: ComponentFixture<PotentialDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PotentialDatesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
