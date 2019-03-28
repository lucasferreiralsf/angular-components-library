import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from './app-routing.module';
import { CompanyComponent } from './company/company.component';
import { CompanyViewEditComponent } from './company/company-view-edit/company-view-edit.component';
import { SubwayFrameworkModule } from '@lucasferreiralsf/angular-frontend-framework';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CompanyViewEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SubwayFrameworkModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    MaterialModule,
    PortalModule,
    OverlayModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ],
  entryComponents: [
    CompanyViewEditComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
