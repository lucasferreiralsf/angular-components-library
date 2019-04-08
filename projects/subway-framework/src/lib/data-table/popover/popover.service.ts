import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {
  emitirCloseEvent = new EventEmitter<any>();
  buttonClickEvent = new EventEmitter<any>();
  constructor() {}

  closeDropdown() {
    this.emitirCloseEvent.emit();
  }

  buttonClickEmit(event: any, element) {
    this.buttonClickEvent.emit({ event, element });
  }
}
