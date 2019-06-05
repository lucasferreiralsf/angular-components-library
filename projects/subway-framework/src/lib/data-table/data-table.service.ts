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
  pageSizeOptionsEmitter = new EventEmitter(true);
  pageSizeEmitter = new EventEmitter(true);
  pageIndex = new EventEmitter(true);
  lengthEmitter = new EventEmitter(true);
  data;

  // tslint:disable-next-line: variable-name
  constructor() {}

  ngOnInit() {}

  setPageOptions(pageSize, length, pageIndex = 0) {
    this.pageSizeEmitter.emit(pageSize);
    this.lengthEmitter.emit(length);
    this.pageIndex.emit(pageIndex);
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
