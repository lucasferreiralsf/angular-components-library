import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataTableInputDataInterface } from './data-table.component';

@Injectable({
  providedIn: 'root'
})
export class DataTableService implements OnInit {
  inputData: DataTableInputDataInterface;
  buttonRowEvent = new EventEmitter();
  topButtonEvent = new EventEmitter();
  inputDataEvent = new EventEmitter();
  afterRemoveRow = new EventEmitter();
  filterLimparEvent = new EventEmitter();
  filterPesquisarEvent = new EventEmitter();
  pageSizeOptionsEvent = new EventEmitter();
  pageSizeEvent = new EventEmitter();
  lengthEvent = new EventEmitter();
  data;

  // tslint:disable-next-line: variable-name
  constructor() {}

  ngOnInit() {}

  setPageSizeOptions() {
    
  }

  getData() {
    return this.data;
  }

  getInputData() {
    return this.inputData;
  }

  setDataSource(element) {
    this.data = new MatTableDataSource(element);
    return this.data;
  }

  setInputData(element) {
    this.inputDataEvent.emit(element);
    this.inputData = element;
  }

  buttonRowClick(event: string, index) {
    this.buttonRowEvent.emit({ event, index });
  }

  removeRowEmit(element) {
    this.afterRemoveRow.emit(element);
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
