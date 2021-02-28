import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ThemeService } from './theme.service';
import { themes } from './variables';
/**
 * Source
 * https://stackblitz.com/edit/angular-css-vars-for-theme?file=src%2Fapp%2Ftheme%2Ftheme.directive.ts
 * @export
 * @class ThemeDirective
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Directive({
  selector: '[themed]',
})
export class ThemeDirective implements OnInit, OnDestroy {
  private themeName = 'lightTheme';
  private _destroy$ = new Subject<void>();
  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: any, private themService: ThemeService) {}

  ngOnInit() {
    this.updateTheme(this.themeName);
    this.themService.getActiveTheme().subscribe((themeName) => {
      this.themeName = themeName;
      this.updateTheme(this.themeName);
    });
  }

  updateTheme(themeName) {
    const element = this.elementRef.nativeElement;
    const them = themes[themeName];
    for (const key in them) {
      element.style.setProperty(`--${key}`, them[key]);
      this.document.body.style.setProperty(key, them[key]);
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
