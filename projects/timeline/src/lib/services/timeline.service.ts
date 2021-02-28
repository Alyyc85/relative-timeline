import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class TimelineService implements OnDestroy {
  amountScrolled$ = new BehaviorSubject<number>(0);
  elementLoadedLength$ = new BehaviorSubject<number>(0);
  loadMore$ = new Subject<void>();

  canLoad$ = new BehaviorSubject<boolean>(true);
  stopRequest$ = new BehaviorSubject<boolean>(false);
  private _destroy$ = new Subject<void>();
  constructor() {}
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
