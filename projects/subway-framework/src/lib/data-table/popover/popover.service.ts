import { Injectable, EventEmitter, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {
  OverlayRef,
  OverlayConfig,
  Overlay,
  ConnectedPosition
} from '@angular/cdk/overlay';
import { PopoverComponent } from './popover.component';

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
