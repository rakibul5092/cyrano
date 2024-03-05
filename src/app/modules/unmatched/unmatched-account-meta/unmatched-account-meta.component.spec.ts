import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnmatchedAccountMetaComponent } from './unmatched-account-meta.component';

describe('UnmatchedAccountMetaComponent', () => {
  let component: UnmatchedAccountMetaComponent;
  let fixture: ComponentFixture<UnmatchedAccountMetaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnmatchedAccountMetaComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(UnmatchedAccountMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
