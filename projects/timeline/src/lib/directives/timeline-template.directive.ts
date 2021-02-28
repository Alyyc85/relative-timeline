import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';
import { TimelineService } from '../services';

@Directive({ selector: '[timelineItem]' })
export class TimelineItemDirective implements AfterViewInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  @Input() idx: number;
  constructor(private el: ElementRef, private srv: TimelineService) {}

  ngAfterViewInit() {
    Promise.resolve().then(() => {
      const scroll = this.srv.amountScrolled$;
      const can = this.srv.canLoad$;
      combineLatest([scroll, can])
        .pipe(
          map((combo) => ({ scroll: combo[0], can: combo[1] })),
          debounceTime(350),
          filter((combo) => combo.can === true && this.idx + 1 === this.srv.elementLoadedLength$.value),
          map(() => {
            const position = this.el.nativeElement.getBoundingClientRect();
            console.log(this.idx, this.srv.elementLoadedLength$.value);

            const inViewPort = position.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 80;
            return inViewPort;
          }),
          takeUntil(this._destroy$)
        )
        .subscribe((inViewPort) => {
          console.log(inViewPort, 'inv');
          if (inViewPort) {
            this.srv.canLoad$.next(false);
            this.srv.loadMore$.next();
          }
        });
    });
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
