import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  isExpanded = true;
  isShowing = false;
  isHideToggle = !this.isExpanded;

  expandEmitter = new EventEmitter<boolean>();
  showEmitter = new EventEmitter<boolean>();
  hideToggleEmitter = new EventEmitter<boolean>();

  constructor() { }

  expandEmit(e: boolean) {
    this.expandEmitter.emit(e);
  }

  showEmit(e: boolean) {
    this.showEmitter.emit(e);
  }

  hideToggleEmit(e: boolean) {
    this.hideToggleEmitter.emit(e);
  }

}
