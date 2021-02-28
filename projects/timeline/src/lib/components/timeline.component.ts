import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TimelineAlignType, TimelineModel } from '../models';
import { TimelineService } from '../services';

@Component({
  selector: 'aly-timeline',
  template: `
    <ng-container *ngIf="alignment === 'left'">
      <div class="container" timelineContainer>
        <div class="item left" *ngFor="let item of list; let i = index; trackBy: trackByFn">
          <div class="line" [ngClass]="alignment"></div>
          <aly-timeline-date [date]="item.date" *ngIf="item.showDate"></aly-timeline-date>
          <div class="content left" timelineItem [idx]="i">
            <div class="dot"></div>
            <div class="content-body">
              <ng-container *ngComponentOutlet="item.obj.component; injector: item.obj.injector"> </ng-container>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
    <ng-container *ngIf="alignment === 'alternate-left' || alignment === 'alternate-right'">
      <div class="container" timelineContainer>
        <div
          class="item alternate-left"
          *ngFor="let item of list; let even = even; let odd = odd; let i = index; trackBy: trackByFn"
          [ngClass]="{ even: even, odd: odd }"
        >
          <aly-timeline-date class="date" [date]="item.date" *ngIf="item.showDate"></aly-timeline-date>
          <div class="content {{ alignment }}" timelineItem [idx]="i" [ngClass]="{ odd: odd, even: even }">
            <div class="graphic">
              <div class="line" [ngClass]="alignment"></div>
              <div class="dot"></div>
            </div>
            <div class="content-body">
              <ng-container *ngComponentOutlet="item.obj.component; injector: item.obj.injector"> </ng-container>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['timeline.component.scss'],
})
export class TimelineComponent implements OnChanges, OnDestroy {
  private _destroy$ = new Subject<void>();
  @Input() list: TimelineModel[];
  @Input() alignment: TimelineAlignType;
  @Output() loadMore = new EventEmitter<void>();
  private _checkDate: string | moment.Moment;
  constructor(private srv: TimelineService) {
    this.srv.loadMore$
      .pipe(
        takeUntil(this._destroy$),
        filter(() => !this.srv.stopRequest$.value)
      )
      .subscribe(() => this.loadMore.emit());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.list && this.list) {
      this._checkDate = this.list[0].date;
      this.checkShowDate(this.list);
      console.log(this.list);
      this.srv.elementLoadedLength$.next(this.list.length);
      if (this.list.length > 0) {
        this.srv.canLoad$.next(true);
      }
      if (this.list.length === 0) {
        this.srv.stopRequest$.next(true);
      }
    }
  }

  private checkShowDate(list: TimelineModel[]) {
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (moment(element.date).dayOfYear() !== moment(this._checkDate).dayOfYear() || element === list[0]) {
        element.showDate = true;
        this._checkDate = element.date;
      } else {
        element.showDate = false;
      }
    }
  }
  trackByFn(index: number, item: TimelineModel) {
    return index;
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
