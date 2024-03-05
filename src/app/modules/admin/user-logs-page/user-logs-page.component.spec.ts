import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogsPageComponent } from './user-logs-page.component';

describe('UserLogsPageComponent', () => {
  let component: UserLogsPageComponent;
  let fixture: ComponentFixture<UserLogsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserLogsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLogsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
