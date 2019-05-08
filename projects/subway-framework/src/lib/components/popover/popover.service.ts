import { Injectable, EventEmitter } from '@angular/core';
import { PopoverDirectionEnum } from './popover-config';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {
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
