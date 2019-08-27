import { Injectable, EventEmitter } from '@angular/core';
import { Notification } from './notification-config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showNotificationsButtonEmitter = new EventEmitter<any>();
  hasNotificationButton: boolean;
  hasNotificationCheckAllButton: boolean;
  isBackend: boolean;
  notifications: Notification[];
  notificationQtdEmitter = new EventEmitter<string>(true);
  addNotificationEmitter = new EventEmitter<Notification>(true);
  setNotificationsEmitter = new EventEmitter<Notification[]>(true);
  notificationClickEmitter = new EventEmitter<Notification>(true);
  checkOneNotificationEmitter = new EventEmitter<Notification>(true);
  checkAllNotificationsEmitter = new EventEmitter(true);
  closeNotificationsComponentEmitter = new EventEmitter(true);

  constructor() { }

  showNotificationButton(e: boolean) {
    this.hasNotificationButton = e;
  }

  showNotificationsButtonEmit() {
    this.showNotificationsButtonEmitter.emit();
  }

  addNotification(notification: Notification) {
    this.notifications.push(notification);
    this.setNotificationQtd(this.getNotificationQtd(this.notifications));
    this.addNotificationEmitter.emit(notification);
  }

  setNotifications(notifications: Notification[]) {
    this.notifications = notifications;
    this.setNotificationQtd(this.getNotificationQtd(this.notifications));
    this.setNotificationsEmitter.emit(notifications);
  }

  checkAllNotifications() {
    if (this.isBackend === false) {
      this.notifications.forEach(e => e.isVisualized = true);
      this.setNotifications(this.notifications);
      this.setNotificationQtd(this.getNotificationQtd(this.notifications));
    } else {
      this.checkAllNotificationsEmitter.emit();
    }
  }

  checkOneNotification(notification: Notification, backend: boolean = true) {
    if (backend === false) {
      const notificationsIds = this.notifications.map(e => e.id);
      const indexNotification = notificationsIds.indexOf(notification.id);
      notification.isVisualized = true;
      this.notifications.splice(indexNotification, 1, notification);
      this.setNotificationQtd(this.getNotificationQtd(this.notifications));
    } else {
      this.checkOneNotificationEmitter.emit(notification);
    }
  }

  onNotificationClick(notification: Notification) {
    this.notificationClickEmitter.emit(notification);
  }

  setNotificationQtd(qtd: string) {
    this.notificationQtdEmitter.emit(qtd);
  }

  getNotificationQtd(notifications: Notification[]) {
    const qtdVisualized = notifications.map(e => e.isVisualized).filter(e => e === true).length;
    const qtd = notifications.length - qtdVisualized;
    return qtd.toString();
  }

  closeNotificationsComponent() {
    this.closeNotificationsComponentEmitter.emit();
  }

  showNotificationCheckAllButton(show: boolean, backend = true) {
    this.hasNotificationCheckAllButton = show;
    this.isBackend = backend;
  }

}
