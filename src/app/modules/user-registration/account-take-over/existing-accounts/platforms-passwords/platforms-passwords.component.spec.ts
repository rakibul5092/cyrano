import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlatformsPasswordsComponent } from './platforms-passwords.component';

describe('PlatformsPasswordsComponent', () => {
  let component: PlatformsPasswordsComponent;
  let fixture: ComponentFixture<PlatformsPasswordsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlatformsPasswordsComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformsPasswordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
