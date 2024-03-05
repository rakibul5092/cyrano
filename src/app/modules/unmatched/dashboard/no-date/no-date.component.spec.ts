import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDateComponent } from './no-date.component';

describe('NoDateComponent', () => {
  let component: NoDateComponent;
  let fixture: ComponentFixture<NoDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoDateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
