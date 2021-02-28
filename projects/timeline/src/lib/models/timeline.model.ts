import { Injector, Type } from '@angular/core';

export interface TimelineModel {
  date: string | moment.Moment;
  showDate?: boolean;
  obj: { component: Type<any>; injector: Injector };
}
