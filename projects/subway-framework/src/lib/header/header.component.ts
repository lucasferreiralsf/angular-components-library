import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from './header.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'sb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() logoImgSrc?: string;
  @Input() appName?: string;

  showMenuButton: boolean;
  showNotificationButton: boolean;
  constructor(private headerService: HeaderService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.showMenuButton = this.headerService.hasSideNav;
    this.showNotificationButton = this.notificationService.hasNotificationButton;
  }

  showMenuButtonClick() {
    this.headerService.showMenuClick();
  }

}
