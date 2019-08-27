import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Notification } from '../notification-config';
import { AlertType, ToastConfig, TOAST_CONFIG_TOKEN } from '../../toastr/toastr-config';

@Component({
  selector: 'sb-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {

  iconContentNotification = { color: '', icon: ''};
  iconDivClass: string;
  constructor(
    public dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notification,
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {

      this.iconDivClass = this.cssClass(this.data);
      if (this.toastConfig.colors && this.toastConfig.colors !== undefined) {
        switch (this.data.type) {
          case AlertType.Success:
            this.iconContentNotification.color = this.toastConfig.colors.success ? this.toastConfig.colors.success : '4px solid #009e0d';
            this.iconContentNotification.icon = 'check_circle';
            break;
          case AlertType.Error:
            this.iconContentNotification.color = this.toastConfig.colors.error ? this.toastConfig.colors.error : '4px solid #ce0000';
            this.iconContentNotification.icon = 'error';
            break;
          case AlertType.Info:
            this.iconContentNotification.color = this.toastConfig.colors.info ? this.toastConfig.colors.info : '4px solid #006bb3';
            this.iconContentNotification.icon = 'info';
            break;
          case AlertType.Warning:
            this.iconContentNotification.color = this.toastConfig.colors.warning ? this.toastConfig.colors.warning : '4px solid #ffca05';
            this.iconContentNotification.icon = 'warning';
            break;
        };
      } else {
        switch (this.data.type) {
          case AlertType.Success:
            this.iconContentNotification.color = '4px solid #009e0d';
            this.iconContentNotification.icon = 'check_circle';
            break;
          case AlertType.Error:
            this.iconContentNotification.color = '4px solid #ce0000';
            this.iconContentNotification.icon = 'error';
            break;
          case AlertType.Info:
            this.iconContentNotification.color = '4px solid #006bb3';
            this.iconContentNotification.icon = 'info';
            break;
          case AlertType.Warning:
            this.iconContentNotification.color = '4px solid #ffca05';
            this.iconContentNotification.icon = 'warning';
            break;
        };
      this.changeDetector.detectChanges();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  cssClass(notification: Notification) {
    if (!notification) {
      return;
    }

    // return css class based on notification type
    switch (notification.type) {
      case AlertType.Success:
        return 'notification-success';
      case AlertType.Error:
        return 'notification-error';
      case AlertType.Info:
        return 'notification-info';
      case AlertType.Warning:
        return 'notification-warning';
    }
  }


}
