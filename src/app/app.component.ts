import { Component, OnInit, EventEmitter } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SidenavService } from 'projects/subway-framework/src/lib/side-nav/sidenav.service';
import { NotificationService } from 'projects/subway-framework/src/lib/notification/notification.service';
import { AlertType } from 'projects/subway-framework/src/public-api';
import { Notification } from 'projects/subway-framework/src/lib/notification/notification-config';

const NOTIFICATIONSTESTE: Notification[] = [
  {
    id: 1,
    date: new Date('1/1/16'),
    title: 'Teste 1',
    description: 'Description teste 1',
    isVisualized: false,
    content: `
    <h1>Teste Notificação</h1>
    <p style="width: 900px">Teste</p>
    `,
    type: AlertType.Success
  },
  {
    id: 2,
    date: new Date('2/20/16'),
    title: 'Teste 1',
    description: '4444 4444 4444 4444 4444 4444 4444 4444 4444 4444 4444 4444 4444 4444 4444 ',
    isVisualized: false,
    type: AlertType.Error,
    content: 'Teste string sem html'
  },
  {
    id: 3,
    date: new Date('5/1/16'),
    title: 'Teste 1',
    description: 'Description teste 1',
    isVisualized: false,
    type: AlertType.Warning
  },
  {
    id: 4,
    date: new Date('6/10/16'),
    title: 'Teste 1',
    description: 'Description teste 1',
    isVisualized: false,
    type: AlertType.Info
  },
  {
    id: 5,
    date: new Date('1/1/16'),
    title: 'Teste 1',
    description: 'Description teste 1',
    isVisualized: false,
    content: `
    <h1>Teste Notificação</h1>
    <p style="width: 900px">Teste</p>
    `,
    type: AlertType.Success
  },
  {
    id: 6,
    date: new Date('5/1/16'),
    title: 'Teste 1',
    description: 'Description teste 1',
    isVisualized: false,
    type: AlertType.Warning
  },
  {
    id: 7,
    date: new Date('6/10/16'),
    title: 'Teste 1',
    description: 'Description teste 1',
    isVisualized: false,
    type: AlertType.Info
  },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'subway-angular-framework';

  isDarkTheme = new EventEmitter<boolean>();
  isExpanded = true;
  isShowing = false;
  isHideToggle = !this.isExpanded;
  expandHeight = '42px';
  collapseHeight = '42px';
  mostrarMenus = true;

  constructor(private overlayContainer: OverlayContainer,
    private sidenavService: SidenavService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.sidenavService.expandEmitter.subscribe(e => {
      this.isExpanded = e;
    });

    this.sidenavService.showEmitter.subscribe(e => {
      this.isShowing = e;
    });

    this.sidenavService.hideToggleEmitter.subscribe(e => {
      this.isHideToggle = e;
    });

    this.notificationService.notificationClickEmitter.subscribe((notification: Notification) => {
      if (notification.isVisualized == false) {
        this.setNotificationChecked(notification);
      }
    });

  }

  ngAfterViewInit() {
    this.notificationService.setNotifications(NOTIFICATIONSTESTE);

  }

  setNotificationChecked(notification: Notification) {
    const notificationsIds = NOTIFICATIONSTESTE.map(e => e.id);
    const indexNotification = notificationsIds.indexOf(notification.id);
    notification.isVisualized = true;
    NOTIFICATIONSTESTE.splice(indexNotification, 1, notification);
  }

  changeColorTheme(colorTheme: string) {
    if (colorTheme === 'dark') {
      this.isDarkTheme.emit(true);
      setTimeout(() => {
        this.overlayContainer
          .getContainerElement()
          .classList.add('sb-dark-theme');
      }, 300);
    } else {
      this.isDarkTheme.emit(false);
      setTimeout(() => {
        this.overlayContainer
          .getContainerElement()
          .classList.remove('sb-dark-theme');
      }, 300);
    }
  }

}
