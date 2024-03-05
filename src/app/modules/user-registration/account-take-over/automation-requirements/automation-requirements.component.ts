import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-automation-requirements',
  templateUrl: './automation-requirements.component.html',
  styleUrls: ['./automation-requirements.component.scss'],
})
export class AutomationRequirementsComponent implements OnInit {
  public enableAccessibilityStatus = true;
  public changeScreenLockStatus = false;
  public disableBatteryOptimization = false;

  public label = 'Save';
  public returnUrl = '';

  /** */
  constructor(private route: ActivatedRoute) {}

  /** */
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.paramMap.get('return_url');
    this.label = this.route.snapshot.paramMap.get('return_url_name') || this.label;
  }

  /** */
  public toggleState(checked: boolean, option: number): void {
    switch (option) {
      case 1:
        this.enableAccessibilityStatus = checked;
        break;
      case 2:
        this.changeScreenLockStatus = checked;
        break;
      case 3:
        this.disableBatteryOptimization = checked;
        break;
    }
  }
}
