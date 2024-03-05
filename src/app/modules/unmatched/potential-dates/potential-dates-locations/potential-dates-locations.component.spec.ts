import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialDatesLocationsComponent } from './potential-dates-locations.component';

describe('PotentialDatesLocationsComponent', () => {
  let component: PotentialDatesLocationsComponent;
  let fixture: ComponentFixture<PotentialDatesLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PotentialDatesLocationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialDatesLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
