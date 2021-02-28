import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicCmpBComponent } from './dynamic-cmp-B.component';

@NgModule({
  imports: [CommonModule],
  exports: [DynamicCmpBComponent],
  declarations: [DynamicCmpBComponent],
  providers: [],
})
export class DynamicCmpBModule {}
