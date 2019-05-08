import { Directive, Input, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Directive({
  selector: '[sbHasNotification]'
})
export class NotificationDirective implements OnInit {

  @Input() showCheckAllButton: boolean;

  constructor(private notificationService: NotificationService) {
    notificationService.showNotificationButton(true);
  }

  ngOnInit() {
    if (this.showCheckAllButton) {
      this.notificationService.showNotificationCheckAllButton(true);
    }
  }

}
