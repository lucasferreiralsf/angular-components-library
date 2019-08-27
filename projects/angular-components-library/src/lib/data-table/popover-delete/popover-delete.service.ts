import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopoverDeleteService {
  emitirCloseEmitter = new EventEmitter<any>();
  buttonClickEmitter = new EventEmitter<any>();
  constructor() {}

  closeDropdown() {
    this.emitirCloseEmitter.emit();
  }

  buttonClickEmit(event: any, element) {
    this.buttonClickEmitter.emit({ event, element });
  }
}
