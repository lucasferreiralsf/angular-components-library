import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  showMenuClickEmitter = new EventEmitter();

  hasSideNav: boolean;
  constructor() { }

  showMenuClick() {
    this.showMenuClickEmitter.emit();
  }

  showMenuButton(e: boolean) {
    this.hasSideNav = e;
  }
}
