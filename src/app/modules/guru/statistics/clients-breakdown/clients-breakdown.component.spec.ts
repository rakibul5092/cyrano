import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ClientsBreakdownComponent } from './clients-breakdown.component';

describe('ClientsBreakdownComponent', () => {
  let component: ClientsBreakdownComponent;
  let fixture: ComponentFixture<ClientsBreakdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsBreakdownComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
