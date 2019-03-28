import { Injectable, EventEmitter, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DataTableService implements OnInit {

  buttonRowEvent = new EventEmitter();
  topButtonEvent = new EventEmitter();
  filterLimparEvent = new EventEmitter();
  filterPesquisarEvent = new EventEmitter();
  data;
  constructor() {}

  ngOnInit() {
  }

  getData() {
    return this.data;
  }

  setDataSource(element) {
    this.data = new MatTableDataSource(element);
    return this.data;
  }

  buttonRowClick(event: string, index) {
    this.buttonRowEvent.emit({event, index});
  }

  topButtonClick(eventSlug: string) {
    this.topButtonEvent.emit(eventSlug);
  }

  filterLimparButtonClick() {
    this.filterLimparEvent.emit();
  }

  filterPesquisarButtonClick() {
    this.filterPesquisarEvent.emit();
  }
}
