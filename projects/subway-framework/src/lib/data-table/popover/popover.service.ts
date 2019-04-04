import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  emitirCloseEvent = new EventEmitter<any>();
  buttonClickEvent = new EventEmitter<any>();
  constructor(
    // tslint:disable-next-line: variable-name
        private destroySubject: Subject<any>,
      ) {
        destroySubject = new Subject();
      }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.unsubscribe();
  }

  closeDropdown() {
    this.emitirCloseEvent.emit();
  }

  buttonClickEmit(event, elementId) {
    this.buttonClickEvent.emit({event, elementId});
  }
}
