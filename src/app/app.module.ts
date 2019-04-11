import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
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
import { SubwayComponentsLibraryModule } from 'projects/subway-framework/src/lib/subway-components-library.module';
import { ToastrService } from 'projects/subway-framework/src/lib/toastr/toastr.service';
import {
  defaultToastConfig,
  TOAST_CONFIG_TOKEN,
  ToastConfig
} from 'projects/subway-framework/src/lib/toastr/toastr-config';

const config: ToastConfig = {
  /* animationTimeOut: 1000, */
  autoHide: true,
  /* colors: { success: 'rgb(206, 0, 0)', error: 'blue' } */
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  declarations: [AppComponent, CompanyComponent, CompanyViewEditComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SubwayComponentsLibraryModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    MaterialModule,
    PortalModule,
    OverlayModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: TOAST_CONFIG_TOKEN,
      useValue: { ...defaultToastConfig, ...config }
    },
    ToastrService
  ],
  entryComponents: [CompanyViewEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
