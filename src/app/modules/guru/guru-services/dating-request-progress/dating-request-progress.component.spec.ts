import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatingRequestProgressComponent } from './dating-request-progress.component';

describe('DatingRequestProgressComponent', () => {
  let component: DatingRequestProgressComponent;
  let fixture: ComponentFixture<DatingRequestProgressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DatingRequestProgressComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DatingRequestProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
