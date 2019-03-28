import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, ViewContainerRef, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, useAnimation, state } from '@angular/animations';
import { flipInX, flipOutX } from 'ng-animate';
import {
  Overlay,
  CdkOverlayOrigin,
  OverlayConfig,
  ConnectedPosition,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import { MatFormField } from '@angular/material';

@Component({
  selector: 'sb-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
  animations: [
    trigger('flipInOut', [
      transition('void => *', useAnimation(flipInX, {
        params: { timing: 0.4, delay: 0 }})),
      transition('* => void', useAnimation(flipOutX, {
        params: { timing: 0.5, delay: 0 }}))
    ])
  ],
})
export class FilterTableComponent implements OnInit, AfterViewInit {

  private strategy: any;
  private config: OverlayConfig;
  private overlayRef: OverlayRef;
  dropDownDialogOpen: string;
  btnLimparOutsideShow: string;
  @Output() limpar: EventEmitter<void> = new EventEmitter();
  @Output() pesquisa: EventEmitter<any> = new EventEmitter();
  @ViewChild(CdkOverlayOrigin) private _overlayOrigin: CdkOverlayOrigin;
  @ViewChild('overlayDropDownContentTemplate') private overlayDropDownContentTemplate: TemplatePortalDirective;

  private positions: ConnectedPosition[] = [{
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top'
  }];

  constructor(
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef
    ) { }

  ngOnInit() {
    this.dropDownDialogOpen = 'out';
    this.btnLimparOutsideShow = 'out';
  }

  ngAfterViewInit(): void {
    this.strategy = this.overlay.position()
      .flexibleConnectedTo(
        this._overlayOrigin.elementRef)
      .withPositions(this.positions).withTransformOriginOn('#filter-table-button');

    this.config = new OverlayConfig({
      positionStrategy: this.strategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
    this.overlayRef = this.overlay.create(this.config);


  }

  openFilterTableContentOverlay() {

    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });

    this.overlayRef.attach(this.overlayDropDownContentTemplate);
  }


  /**
   * closeDropdown
   */
  public closeDropdown() {
    if (this.overlayRef.hasAttached) {
      this.overlayRef.detach();
    }
  }

  /* clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();  // <- that will stop propagation on lower layers
  } */


  /* @HostListener("document:click", ['$event']) clickedOutside($event) {
      this.dropDownDialogOpen = 'out'
  } */

  toggleFilter(): void {
    this.dropDownDialogOpen = this.dropDownDialogOpen === 'out' ? 'in' : 'out';
  }

  pesquisar() {
    this.pesquisa.emit();
    this.btnLimparOutsideShow = 'in';
    this.closeDropdown();
  }

  limparFiltro() {
    this.limpar.emit();
    this.btnLimparOutsideShow = 'out';
    this.closeDropdown();
  }

  /* pesquisar() {
    this.pesquisa.emit()
    this.btnLimparOutsideShow = 'in'
    this.toggleFilter()
  } */

  /* limparFiltro() {
    this.limpar.emit()
    this.btnLimparOutsideShow = 'out'
    this.dropDownDialogOpen = 'out'
  } */

}
