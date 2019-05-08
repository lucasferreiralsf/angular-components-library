import { Injectable, EventEmitter } from '@angular/core';
import { Notification } from './notification-config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showNotificationsButtonEmitter = new EventEmitter<any>();
  hasNotificationButton: boolean;
  hasNotificationCheckAllButton: boolean;
  notifications: Notification[];
  notificationQtdEmitter = new EventEmitter<string>(true);
  addNotificationEmitter = new EventEmitter<Notification>(true);
  setNotificationsEmitter = new EventEmitter<Notification[]>(true);
  notificationClickEmitter = new EventEmitter<Notification>(true);
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
    this.notifications.forEach(e => e.isVisualized = true);
    this.setNotifications(this.notifications);
    this.setNotificationQtd(this.getNotificationQtd(this.notifications));
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

  showNotificationCheckAllButton(e: boolean) {
    this.hasNotificationCheckAllButton = e;
  }

}
