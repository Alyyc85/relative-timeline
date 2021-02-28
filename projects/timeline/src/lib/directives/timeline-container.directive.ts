import { Directive, HostListener } from '@angular/core';
import { TimelineService } from '../services';

@Directive({ selector: '[timelineContainer]' })
export class TimelineContainerDirective {
  constructor(private srv: TimelineService) {}

  @HostListener('scroll', ['$event.target.scrollTop']) onContainerScroll(scrollTop: any) {
    this.srv.amountScrolled$.next(scrollTop);
  }
}
