import { TimelineModule } from '@aly/timeline';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { BtnModule } from './layout/button.module';
import { DynamicCmpAModule } from './layout/dynamic-cmp-A/dynamic-cmp-A.module';
import { DynamicCmpBModule } from './layout/dynamic-cmp-B/dynamic-cmp-B.module';
import { ThemeModule } from './theme/theme.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ThemeModule, TimelineModule, CommonModule, BtnModule, HttpClientModule, DynamicCmpAModule, DynamicCmpBModule],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
