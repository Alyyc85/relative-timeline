import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'aly-timeline-date',
  template: `
    <div class="date">
      <div class="date-content" unostyle>
        <div class="line"></div>
        <ng-container *ngIf="isToday; else notToday"> Oggi </ng-container>
        <ng-template #notToday>
          {{ getDate(date) }}
        </ng-template>
        <div class="line"></div>
      </div>
    </div>
  `,
  styleUrls: ['timeline-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineDateComponent implements OnChanges {
  @Input() date: string | moment.Moment;
  isToday: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.date && this.date) {
      this.isToday = moment(this.date).dayOfYear() === moment().dayOfYear() ? true : false;
    }
  }

  getDate(date: any) {
    return moment(date).format('DD MMM YYYY');
  }
}
