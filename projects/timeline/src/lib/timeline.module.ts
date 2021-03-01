import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimelineComponent } from './components';
import { TimelineDateComponent } from './components/timeline-date.component';
import { TimelineContainerDirective } from './directives/timeline-container.directive';
import { TimelineItemDirective } from './directives/timeline-template.directive';

@NgModule({
  declarations: [TimelineComponent, TimelineContainerDirective, TimelineItemDirective, TimelineDateComponent],
  imports: [CommonModule],
  exports: [TimelineComponent],
  providers: [],
})
export class TimelineModule {}
