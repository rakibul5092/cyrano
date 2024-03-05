import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreferencesVsSwipesComponent } from './preferences-vs-swipes.component';

describe('PreferencesVsSwipesComponent', () => {
  let component: PreferencesVsSwipesComponent;
  let fixture: ComponentFixture<PreferencesVsSwipesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PreferencesVsSwipesComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PreferencesVsSwipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
