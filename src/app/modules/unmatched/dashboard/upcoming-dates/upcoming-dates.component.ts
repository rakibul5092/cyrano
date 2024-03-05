import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-upcoming-dates',
  templateUrl: './upcoming-dates.component.html',
  styleUrls: ['./upcoming-dates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingDatesComponent implements OnInit {
  today = new Date();

  days = [];

  dateData = [];

  /** */
  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      const currentDate = this.today;
      currentDate.setDate(currentDate.getDate() + 1);

      const random = Math.floor(Math.random() * 2);

      this.days.push({
        date: currentDate.toDateString(),
        hasDate: random === 1,
      });
    }

    // this.generateUpcomingDate();
  }

  /**
   * method generates upcoming date daya
   */
  // public generateUpcomingDate(): void {
  //     let i = 0;
  //     const len = this.days.length;
  //     let k = i;
  //     while( true ) {
  //         for( ; k < len && this.days[k].hasDate; k++ ){
  //             this.dateData.push( this.days[k] );
  //         }

  //         i = k;

  //         for( ; k < len && !this.days[k].hasDate; k++ ){}
  //         k--;
  //         if( k - i > 1 ){
  //             this.dateData.push( this.days[i++] );
  //             this.dateData.push( {
  //                 startDate : this.days[i],
  //                 endDate   : this.days[k]
  //             } );
  //         }else{
  //             for( ; i <= k; i++ ){
  //                 this.dateData.push( this.days[i] );
  //             }
  //         }

  //         k++;
  //         if( k >= len ){
  //             break;
  //         }
  //         i = k;
  //     }
  // }
}
