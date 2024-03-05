import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss'],
})
export class WelcomeScreenComponent implements OnInit, OnChanges {
  @Input() nextPath: string;
  @Input() defaultValue: boolean = false;
  @Output() handleOnAgree: EventEmitter<void> = new EventEmitter();

  public policies = [
    {
      title: 'UNMATCHED_USER.BE_YOURSELF.TITLE',
      subTitle: 'UNMATCHED_USER.BE_YOURSELF.SUBTITLE',
    },
    {
      title: 'UNMATCHED_USER.STAY_SAFE.TITLE',
      subTitle: 'UNMATCHED_USER.STAY_SAFE.SUBTITLE',
    },
    {
      title: 'UNMATCHED_USER.PLAY_IT_COOL.TITLE',
      subTitle: 'UNMATCHED_USER.PLAY_IT_COOL.SUBTITLE',
    },
    {
      title: 'UNMATCHED_USER.BE_PROACTIVE.TITLE',
      subTitle: 'UNMATCHED_USER.BE_PROACTIVE.SUBTITLE',
    },
  ];

  public termsAndConditionForm: FormGroup;

  /**
   * @param navController
   */
  constructor(private navController: NavController, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(): void {
    this.termsAndConditionForm?.get('terms')?.setValue(this.defaultValue);
  }

  /**
   * On agree on terms and continue to next component
   */
  public onAgree(): void {
    if (this.termsAndConditionForm.valid) {
      if (this.nextPath) {
        this.navController.navigateForward(this.nextPath, { animated: true, animationDirection: 'forward' });
      } else {
        this.handleOnAgree.emit();
      }
    }
  }

  public onClick(): void {
    this.termsAndConditionForm.get('terms').setValue(!this.termsAndConditionForm.get('terms').value);
  }

  private buildForm(): void {
    this.termsAndConditionForm = this.fb.group({
      terms: [false, [Validators.required, Validators.requiredTrue]],
    });
  }
}
