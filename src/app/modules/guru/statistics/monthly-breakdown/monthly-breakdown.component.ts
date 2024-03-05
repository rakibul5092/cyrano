import { Component } from '@angular/core';

@Component({
  selector: 'app-monthly-breakdown',
  templateUrl: './monthly-breakdown.component.html',
  styleUrls: ['./monthly-breakdown.component.scss'],
})
export class MonthlyBreakdownComponent {
  public months: { id: number; name: string; value: number }[] = [
    { id: 2, name: 'Jan', value: 20 },
    { id: 3, name: 'Fab', value: 50 },
    { id: 4, name: 'Mar', value: 100 },
    { id: 5, name: 'Apr', value: 100 },
    { id: 6, name: 'May', value: 50 },
    { id: 7, name: 'June', value: 20 },
  ];

  public selectedMonth: any;
  public measures: number[] = [150, 100, 50, 0];
}
