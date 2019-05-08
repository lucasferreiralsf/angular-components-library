import {
  Component,
  ViewContainerRef,
  Input,
  OnInit,
  ViewChild,
  Inject,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { trigger, transition, useAnimation, state, style } from '@angular/animations';
import { tada, fadeInDown, fadeOut, slideInRight, slideOutRight } from 'ng-animate';
import { NotificationService } from './notification.service';
import { Overlay, OverlayConfig, OverlayRef, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import { AlertType, ToastConfig, TOAST_CONFIG_TOKEN } from '../toastr/toastr-config';
import { Notification } from './notification-config';
import { MatDialog } from '@angular/material';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';


@Component({
  selector: 'sb-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('newNotifications', [
      transition(
        '* <=> *',
        useAnimation(tada/* , {
          params: {
            timing: 5
          }
        } */)
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
      ),
    ]),
    trigger('flipInRight', [
      transition('void => *', useAnimation(slideInRight, { params: { timing: 0.250 } })),
      transition('* => void', useAnimation(slideOutRight, { params: { timing: 0.250 } }))
    ])
  ]
})
export class NotificationComponent implements OnInit {
  private strategy: any;
  private config: OverlayConfig;
  private overlayRef: OverlayRef;

  showBadge: boolean;

  @Input() badgeValor: string;
  @Input() badgeColor: string;
  @Input() badgeBorderColor: string;

  hasNotificationButton: boolean;
  viewNotificationContent: boolean;
  hasNotificationCheckAllButton: boolean;
  iconNotification: string;
  notifications: Notification[];

  @Input() isRenderSidenav: boolean;
  notificationContent: ElementRef;
  @ViewChild('notificationContent') set assetInput(elRef: ElementRef) {
    this.notificationContent = elRef;
  }

  @ViewChild(CdkOverlayOrigin) private popoverOrigin: CdkOverlayOrigin;
  @ViewChild('popoverContentTemplate')
  private popoverContentTemplate: TemplatePortalDirective;

  position: ConnectedPosition[] = [{
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top'
  }];

  constructor(
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private notificationService: NotificationService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.hasNotificationButton = this.notificationService.hasNotificationButton;
    this.hasNotificationCheckAllButton = this.notificationService.hasNotificationCheckAllButton;
    this.notificationService.notificationQtdEmitter.subscribe(qtd => {
      if (qtd > 0) {
        this.showBadge = true;
      } else {
        this.showBadge = false;
      }
      this.badgeValor = qtd;
    });
  }

  ngAfterViewInit() {
    this.strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.popoverOrigin.elementRef)
      .withPositions(this.position);

    this.config = new OverlayConfig({
      positionStrategy: this.strategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
    this.overlayRef = this.overlay.create(this.config);

    if (this.hasNotificationButton) {
      this.notificationService.setNotificationsEmitter.subscribe((notifications) => {
        this.notifications = notifications;
      });
    }
    this.changeDetector.detectChanges();

  }

  showListNotification(tab: number, element) {
    if(tab == 1) {
      if(this.notifications.map(e => e.isVisualized).filter(e => e === false).length > 0 && element == 1) {
        return true;
      }
      if(this.notifications.map(e => e.isVisualized).filter(e => e === false).length == 0 && element == 2) {
        return true;
      } else {
        return false;
      }
    } else {
      if(this.notifications.map(e => e.isVisualized).filter(e => e === true).length > 0 && element == 1) {
        return true;
      }
      if(this.notifications.map(e => e.isVisualized).filter(e => e === true).length == 0 && element == 2) {
        return true;
      } else {
        return false;
      }
    }
  }

  onMatListClick(item: Notification) {
    this.notificationService.onNotificationClick(item);
      this.dialog.open(NotificationModalComponent, {data: item});
  }


  cssClass(notification: Notification) {
    if (!notification) {
      return;
    }

    // return css class based on notification type
    switch (notification.type) {
      case AlertType.Success:
        this.iconNotification = 'check_circle';
        return 'notification-success';
      case AlertType.Error:
        this.iconNotification = 'error';
        return 'notification-error';
      case AlertType.Info:
        this.iconNotification = 'info';
        return 'notification-info';
      case AlertType.Warning:
        this.iconNotification = 'warning';
        return 'notification-warning';
    }
  }

  onMarkCheckedClick() {
    this.notificationService.checkAllNotifications();
  }

  cssStyle() {
    if (this.badgeBorderColor) {
      if (this.badgeValor.length === 3) {
        return { border: `solid ${this.badgeBorderColor}`, width: this.getBadgeWidth().width };
      }
      if (this.badgeValor.length >= 4) {
        return { border: `solid ${this.badgeBorderColor}`, width: this.getBadgeWidth().width };
      } else {
        return { border: `solid ${this.badgeBorderColor}` };
      }
    } else {
      return this.getBadgeWidth();
    }
  }

  getBadgeWidth() {

    if (this.badgeValor.length === 3) {
      return { width: '22px' };
    }
    if (this.badgeValor.length >= 4) {
      return { width: '36px' };
    }
  }

  openPopover() {
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });

    this.notificationService.closeNotificationsComponentEmitter.subscribe(() => {
      this.overlayRef.detach();
    });
    this.overlayRef.attach(this.popoverContentTemplate);
  }

}
