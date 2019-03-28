import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  showMenuClickEvent = new EventEmitter();

  hasSideNav: boolean;
  constructor() { }

  showMenuClick() {
    this.showMenuClickEvent.emit();
  }

  showMenuButton(e: boolean) {
    this.hasSideNav = e;
  }
}
