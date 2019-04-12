import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Alert, AlertType, TOAST_CONFIG_TOKEN, ToastConfig } from './toastr-config';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  private autoHide: boolean;

  afterCloseEmitter = new EventEmitter<Alert>();

  constructor(private router: Router, @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });

    this.autoHide = toastConfig.autoHide ? toastConfig.autoHide : false;
  }

  afterCloseEmit(alert: Alert) {
    this.afterCloseEmitter.emit(alert);
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Success, message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Error, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Info, message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, message, keepAfterRouteChange);
  }

  alert(type: AlertType, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next( {
      type,
      message,
      id: Math.random() * 1000 + 1,
      status: '',
      onHover: '',
      autoHide: this.autoHide
    } as Alert);
  }

  clear() {
    // clear alerts
    this.subject.next();
  }
}
