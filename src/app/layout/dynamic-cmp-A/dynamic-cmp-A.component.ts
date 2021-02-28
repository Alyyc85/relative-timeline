import { TimelineInj } from '@aly/timeline';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'aly-dynamic-cmp-A',
  template: `
    <div>
      <h2>I'm a great {{ title }}</h2>
      <h4>{{ model.title }}</h4>
    </div>
  `,
})
export class DynamicCmpAComponent implements OnInit {
  title = 'Cmp A';
  constructor(@Inject(TimelineInj) public model: any) {}

  ngOnInit() {}
}
