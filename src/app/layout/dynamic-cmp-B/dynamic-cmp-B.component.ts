import { TimelineInj } from '@aly/timeline';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'aly-dynamic-cmp-B',
  template: `
    <div>
      <h2>I'm a great {{ title }}</h2>
      <p>{{ model.body }}</p>
    </div>
  `,
})
export class DynamicCmpBComponent implements OnInit {
  title = 'Cmp B';
  constructor(@Inject(TimelineInj) public model: any) {}

  ngOnInit() {}
}
