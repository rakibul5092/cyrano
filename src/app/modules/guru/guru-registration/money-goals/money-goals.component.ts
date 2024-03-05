import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeaderService } from 'src/app/modules/user-registration/layout/header/header.service';
import { CommonUtilService } from '../../../../services/common-utils.service';

@Component({
  selector: 'app-money-goals',
  templateUrl: './money-goals.component.html',
  styleUrls: ['./money-goals.component.scss'],
})
export class MoneyGoalsComponent implements OnInit {
  public icons: any;
  public dateControl: FormControl = new FormControl(60);
  public goal: number;
  private dateCost: number = 4;
  constructor(private commonUtilService: CommonUtilService, private headerService: HeaderService) {}

  ngOnInit(): void {
    this.icons = this.commonUtilService.icons;
    this.calculateDatesGoal();
  }

  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(92.3);
  }

  /**
   * on click continue
   */
  public continue(): void {
    this.commonUtilService.navigate('../guru-registration/almost-ready');
  }

  /**
   * calculate the dates goal
   *
   * @private
   */
  private calculateDatesGoal(): void {
    this.goal = this.dateControl.value * this.dateCost;
    this.dateControl.valueChanges.subscribe((value) => {
      this.goal = this.dateCost * value;
    });
  }
}
