import {
  Component,
  ViewChild,
  ViewContainerRef,
  Input,
  AfterViewInit,
} from '@angular/core';

import {
  Overlay,
  CdkOverlayOrigin,
  OverlayConfig,
  ConnectedPosition,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInUp, fadeOut } from 'ng-animate';
import { PopoverDeleteService } from './popover-delete.service';

@Component({
  selector: 'sb-popover-delete',
  templateUrl: './popover-delete.component.html',
  styleUrls: ['./popover-delete.component.scss'],
  animations: [
    trigger('flipInOut', [
      transition(
        'void => *',
        useAnimation(fadeInUp, {
          params: { timing: 0.3, delay: 0, a: '10px', b: '0' }
        })
      ),
      transition(
        '* => void',
        useAnimation(fadeOut, {
          params: { timing: 0.3, delay: 0 }
        })
      )
    ])
  ]
})
export class PopoverDeleteComponent implements AfterViewInit {
  private strategy: any;
  private config: OverlayConfig;
  private overlayRef: OverlayRef;

  @Input() popoverTitle: string;
  @Input() popoverDescription: string;
  @Input() element;
  @Input() disabled: boolean;
  @ViewChild(CdkOverlayOrigin) private popoverOrigin: CdkOverlayOrigin;
  @ViewChild('popoverContentTemplate')
  private popoverContentTemplate: TemplatePortalDirective;

  private positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom'
    }
  ];

  constructor(
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private popoverService: PopoverDeleteService
  ) {}

  ngAfterViewInit(): void {
    if(!this.disabled) {
      this.strategy = this.overlay
        .position()
        .flexibleConnectedTo(this.popoverOrigin.elementRef)
        .withPositions(this.positions)
        .withTransformOriginOn('#action-dropdown-button');

      this.config = new OverlayConfig({
        positionStrategy: this.strategy,
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop'
      });
      this.overlayRef = this.overlay.create(this.config);
    }
  }

  openPopover() {
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });

    this.popoverService.emitirCloseEmitter.subscribe(() => {
      this.overlayRef.detach();
    });
    this.overlayRef.attach(this.popoverContentTemplate);
  }

  clickActionButton(event) {
    this.popoverService.buttonClickEmit(event.toLowerCase(), this.element);
    this.popoverService.closeDropdown();
  }


}
