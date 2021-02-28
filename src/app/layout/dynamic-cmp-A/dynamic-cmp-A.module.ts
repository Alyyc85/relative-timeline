import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicCmpAComponent } from './dynamic-cmp-A.component';

@NgModule({
  imports: [CommonModule],
  exports: [DynamicCmpAComponent],
  declarations: [DynamicCmpAComponent],
  providers: [],
})
export class DynamicCmpAModule {}
