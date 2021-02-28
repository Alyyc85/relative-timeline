import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'aly-btn',
  template: ` <button (click)="click.emit()" [ngClass]="{ selected: selected }">{{ text }}</button> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['button.component.scss'],
})
export class BtnComponent implements OnInit {
  @Input() text: string;
  @Input() selected: boolean;

  @Output() click = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}
}
