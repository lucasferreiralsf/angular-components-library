import { NgModule, LOCALE_ID } from '@angular/core';
import { ViewContainerComponent } from './view-container/view-container.component';
import { FilterTableComponent } from './data-table/filter-table/filter-table.component';
import { MatFormFieldComponent } from './components/sb-mat-form-field/sb-mat-form-field.component';
import { FilterTableActionsComponent } from './data-table/filter-table/filter-table-actions/filter-table-actions.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableActionsComponent } from './data-table/data-table-actions/data-table-actions.component';
import { DataTableRowActionsComponent } from './data-table/data-table-row-actions/data-table-row-actions.component';
import { PopoverComponent } from './data-table/popover/popover.component';
import { ButtonComponent } from './components/button/button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ViewEditContainerComponent } from './view-edit-container/view-edit-container.component';
import { MatTabComponent } from './view-edit-container/mat-tab/mat-tab.component';
import { HeaderComponent } from './header/header.component';
import { MATERIAL_MODULES } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderDirective } from './header/header.directive';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
import { ToastrComponent } from './toastr/toastr.component';
import { CnpjPipe } from './pipes/cnpj.pipe';
import { CpfPipe } from './pipes/cpf.pipe';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  declarations: [
    ViewContainerComponent,
    FilterTableComponent,
    MatFormFieldComponent,
    FilterTableActionsComponent,
    DataTableComponent,
    DataTableActionsComponent,
    DataTableRowActionsComponent,
    PopoverComponent,
    ButtonComponent,
    DialogComponent,
    ViewEditContainerComponent,
    MatTabComponent,
    HeaderComponent,
    HeaderDirective,
    SideNavComponent,
    ToastrComponent,
    CnpjPipe,
    CpfPipe,
    CpfCnpjPipe
  ],
  imports: [
    ReactiveFormsModule,
    PerfectScrollbarModule,
    FormsModule,
    MATERIAL_MODULES,
    FlexLayoutModule,
    PortalModule,
    OverlayModule
  ],
  exports: [
    ViewContainerComponent,
    MatFormFieldComponent,
    ButtonComponent,
    ViewEditContainerComponent,
    DialogComponent,
    HeaderComponent,
    HeaderDirective,
    SideNavComponent,
    ToastrComponent,
    CnpjPipe,
    CpfPipe,
    CpfCnpjPipe
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ],
  entryComponents: [ToastrComponent]
})
export class SubwayComponentsLibraryModule {}
