import { TimelineAlignType, TimelineInj, TimelineModel } from '@aly/timeline';
import { Component, Injector, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { DynamicCmpAComponent } from './layout/dynamic-cmp-A/dynamic-cmp-A.component';
import { DynamicCmpBComponent } from './layout/dynamic-cmp-B/dynamic-cmp-B.component';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'aly-root',
  template: `
    <div class="container" themed>
      <header class="head">{{ title }}</header>
      <aside class="tools">
        <fieldset>
          <legend>Theme</legend>
          <div>
            <aly-btn
              text="Light"
              (click)="setTheme('lightTheme')"
              [selected]="(themeSrv.getActiveTheme() | async) === 'lightTheme'"
            ></aly-btn>
            <aly-btn text="Dark" (click)="setTheme('darkTheme')" [selected]="(themeSrv.getActiveTheme() | async) === 'darkTheme'"></aly-btn>
          </div>
        </fieldset>
        <fieldset>
          <legend>Timeline alignment</legend>
          <div>
            <aly-btn text="Left" (click)="setAlign('left')" [selected]="alignment === 'left'"></aly-btn>
            <aly-btn text="Alternate Left" (click)="setAlign('alternate-left')" [selected]="alignment === 'alternate-left'"></aly-btn>
            <aly-btn text="Alternate Right" (click)="setAlign('alternate-right')" [selected]="alignment === 'alternate-right'"></aly-btn>
          </div>
        </fieldset>
      </aside>
      <div class="content">
        <div class="timeline">
          <aly-timeline [list]="model" [alignment]="alignment" (loadMore)="loadMore($event)"></aly-timeline>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'relative timeline';
  alignment: TimelineAlignType = 'left';
  model: TimelineModel[];

  constructor(public themeSrv: ThemeService, private srv: AppService, private inj: Injector) {}

  ngOnInit() {
    this.load();
  }

  private mapToTimelineModel(list: any): TimelineModel[] {
    return list.map((l) => {
      const alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'z'];
      const checkForDynamicTmp = alph.findIndex((el) => el === l.title[1]);
      return <TimelineModel>{
        date: l.date,
        obj: {
          component: checkForDynamicTmp > alph.length / 2 ? DynamicCmpAComponent : DynamicCmpBComponent,
          injector: Injector.create({ providers: [{ provide: TimelineInj, useValue: l }], parent: this.inj }),
        },
      };
    });
  }

  private load() {
    this.srv.list$().subscribe((res) => (this.model = this.mapToTimelineModel(res)));
  }

  loadMore(e: any) {
    this.load();
  }
  setTheme(theme: string) {
    this.themeSrv.setActiveThem(theme);
  }

  setAlign(align: TimelineAlignType) {
    this.alignment = align;
  }
}
