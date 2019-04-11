import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import {
  Alert,
  AlertType,
  ToastConfig,
  TOAST_CONFIG_TOKEN
} from './toastr-config';
import { ToastrService } from './toastr.service';
import { toastAnimations, ToastAnimationState } from './toastr-animation';

@Component({
  selector: 'sb-toastr-notification',
  templateUrl: 'toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  animations: [toastAnimations.bounceToast]
})
export class ToastrComponent implements OnInit {
  animationState: ToastAnimationState;
  alerts: Alert[] = [];
  iconType: string;

  animationTimeOut: number;
  showFromBottom: boolean;

  constructor(
    private toastrService: ToastrService,
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig,
    private cdRef: ChangeDetectorRef
  ) {
    this.animationTimeOut = this.toastConfig.animationTimeOut
      ? this.toastConfig.animationTimeOut
      : 4000;
    this.showFromBottom = this.toastConfig.showFromBottom
      ? this.toastConfig.showFromBottom
      : false;
  }

  ngOnInit() {
    this.toastrService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }
      // add alert to array
      this.alerts.push(alert);
      if (alert.autoHide === true) {
        this.setTimeOut(alert);
      }
      this.cdRef.detectChanges();
    });
  }

  ngAfterContentInit() {

  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
    this.cdRef.detectChanges();
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        this.iconType = 'check_circle';
        return 'toast-success';
      case AlertType.Error:
        this.iconType = 'error';
        return 'toast-error';
      case AlertType.Info:
        this.iconType = 'info';
        return 'toast-info';
      case AlertType.Warning:
        this.iconType = 'warning';
        return 'toast-warning';
    }
  }

  cssStyle(alert: Alert) {
    if (!alert) {
      return;
    }
    const colors = this.toastConfig.colors;
    if (colors) {
      switch (alert.type) {
        case AlertType.Success:
          return colors.success ? { background: colors.success } : '';
        case AlertType.Error:
          return colors.error ? { background: colors.error } : '';
        case AlertType.Info:
          return colors.info ? { background: colors.info } : '';
        case AlertType.Warning:
          return colors.warning ? { background: colors.warning } : '';
      }
    }
  }

  setTimeOut(alert: Alert) {
    if (alert.autoHide === true) {
      alert.status = 'timedOut';
      alert.onHover = setTimeout(
        () => this.setClose(alert),
        this.animationTimeOut
      );
    }
  }

  onMouseOver(alert: Alert) {
    if (alert.status === 'timedOut') {
      clearTimeout(alert.onHover);
    }
  }

  onMouseLeave(alert: Alert) {
    this.setTimeOut(alert);
  }

  setClose(alert) {
    alert.status = 'closing';
  }

  onFadeFinished(event: AnimationEvent, alert: Alert) {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';

    if (isFadeOut) {
      this.removeAlert(alert);
    }
  }
}
