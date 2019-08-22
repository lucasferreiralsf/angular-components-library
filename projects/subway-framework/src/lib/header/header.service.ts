import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  showMenuClickEmitter = new EventEmitter();

  showMenu: boolean = false;
  constructor() { }

  showMenuClick() {
    this.showMenuClickEmitter.emit();
  }

  showMenuButton(e: boolean) {
    this.showMenu = e;
  }
}
