import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeDirective } from './theme.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ThemeDirective],
  exports: [ThemeDirective],
})
export class ThemeModule {}
