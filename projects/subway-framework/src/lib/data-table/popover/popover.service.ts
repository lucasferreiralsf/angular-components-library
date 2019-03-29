import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  emitirCloseEvent = new EventEmitter<any>();
  buttonClickEvent = new EventEmitter<any>();
  constructor() {

  }

  closeDropdown() {
    this.emitirCloseEvent.emit();
  }

  buttonClickEmit(event, elementId) {
    this.buttonClickEvent.emit({event, elementId});
  }
}
