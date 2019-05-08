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
import { fadeInUp, fadeOut, fadeInDown, fadeInRight, fadeInLeft } from 'ng-animate';
import { PopoverService } from './popover.service';
import { PopoverDirectionEnum } from './popover-config';

@Component({
  selector: 'sb-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  animations: [
    trigger('showToTop', [
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
    ]),
    trigger('showToRight', [
      transition(
        'void => *',
        useAnimation(fadeInLeft, {
          params: { timing: 0.3, delay: 0, a: '-7px', b: '0' }
        })
      ),
      transition(
        '* => void',
        useAnimation(fadeOut, {
          params: { timing: 0.3, delay: 0 }
        })
      )
    ]),
    trigger('showToBottom', [
      transition(
        'void => *',
        useAnimation(fadeInDown, {
          params: { timing: 0.3, delay: 0, a: '-7px', b: '0' }
        })
      ),
      transition(
        '* => void',
        useAnimation(fadeOut, {
          params: { timing: 0.3, delay: 0 }
        })
      )
    ]),
    trigger('showToLeft', [
      transition(
        'void => *',
        useAnimation(fadeInRight, {
          params: { timing: 0.3, delay: 0, a: '7px', b: '0' }
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
export class PopoverComponent implements AfterViewInit {
  private strategy: any;
  private config: OverlayConfig;
  private overlayRef: OverlayRef;

  @Input() popoverTitle: string;
  @Input() popoverDescription: string;
  @Input() popoverIcon: string;
  @Input() popoverButtonTitle: string;
  @Input() element;
  @ViewChild(CdkOverlayOrigin) private popoverOrigin: CdkOverlayOrigin;
  @ViewChild('popoverContentTemplate')
  private popoverContentTemplate: TemplatePortalDirective;
  popoverDirectionEnum = PopoverDirectionEnum;
  @Input() popoverDirection?: PopoverDirectionEnum = PopoverDirectionEnum.bottom;
  private positionToTop: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom'
    }
  ];

  private positionToLeft: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'center'
    }
  ];

  private positionToBottom: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top'
    }
  ];

  private positionToRight: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center'
    }
  ];

  constructor(
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private popoverService: PopoverService
  ) {
  }

  ngAfterViewInit(): void {
    this.strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.popoverOrigin.elementRef)
      .withPositions(this.getPosition())
      .withDefaultOffsetY(this.getDefaultOffset('y'))
      .withDefaultOffsetX(this.getDefaultOffset());

    this.config = new OverlayConfig({
      positionStrategy: this.strategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
    this.overlayRef = this.overlay.create(this.config);
  }

  getDefaultOffset(xOrY?: string) {

    if (xOrY === 'y') {
      switch (this.popoverDirection) {
        case PopoverDirectionEnum.top:
          return -7;
        case PopoverDirectionEnum.right:
          return 0;
        case PopoverDirectionEnum.bottom:
          return 7;
        case PopoverDirectionEnum.left:
          return 20;

        default:
          return 7;
      }
    } else {
      switch (this.popoverDirection) {
        case PopoverDirectionEnum.top:
          return 15;
        case PopoverDirectionEnum.right:
          return 7;
        case PopoverDirectionEnum.bottom:
          return 15;
        case PopoverDirectionEnum.left:
          return -7;

        default:
          return 15;
      }
    }
  }

  getPosition() {
    switch (this.popoverDirection) {
      case PopoverDirectionEnum.top:
        return this.positionToTop;
      case PopoverDirectionEnum.right:
        return this.positionToRight;
      case PopoverDirectionEnum.bottom:
        return this.positionToBottom;
      case PopoverDirectionEnum.left:
        return this.positionToLeft;

      default:
        return this.positionToBottom;
    }

  }

cssClass() {
  // return css class based on alert type
  switch (this.popoverDirection) {
    case PopoverDirectionEnum.top:
      return 'arrowBoxBottom';
    case PopoverDirectionEnum.right:
      return 'arrowBoxLeft';
    case PopoverDirectionEnum.bottom:
      return 'arrowBoxTop';
    case PopoverDirectionEnum.left:
      return 'arrowBoxRight';

    default:
      return 'arrowBoxTop';
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
