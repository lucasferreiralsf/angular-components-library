import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataTableInputDataInterface } from './data-table-config';

@Injectable({
  providedIn: 'root'
})
export class DataTableService implements OnInit {
  inputData: DataTableInputDataInterface;
  buttonRowEmitter = new EventEmitter();
  topButtonEmitter = new EventEmitter();
  inputDataEmitter = new EventEmitter();
  afterRemoveRow = new EventEmitter();
  filterLimparEmitter = new EventEmitter();
  filterPesquisarEmitter = new EventEmitter();
  pageSizeOptionsEmitter = new EventEmitter();
  pageSizeEmitter = new EventEmitter();
  lengthEmitter = new EventEmitter();
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
    this.inputDataEmitter.emit(element);
    this.inputData = element;
  }

  buttonRowClick(event: string, index) {
    this.buttonRowEmitter.emit({ event, index });
  }

  removeRowEmit(element) {
    this.afterRemoveRow.emit(element);
  }

  topButtonClick(eventSlug: string) {
    this.topButtonEmitter.emit(eventSlug);
  }

  filterLimparButtonClick() {
    this.filterLimparEmitter.emit();
  }

  filterPesquisarButtonClick() {
    this.filterPesquisarEmitter.emit();
  }
}
