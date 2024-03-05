import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { VerticalTabbarComponent } from './vertical-tabbar.component';

describe('VerticalTabbarComponent', () => {
  let component: VerticalTabbarComponent;
  let fixture: ComponentFixture<VerticalTabbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VerticalTabbarComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(VerticalTabbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
