import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService implements OnInit {
  widthDialog: string;
  minWidthDialog: string;
  dialogRefEmitter = new EventEmitter();
  confirmClick = new EventEmitter<any>();
  cancelClick = new EventEmitter<any>();
  dialogRef: MatDialogRef<any>;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(dialogComponent, data, config?: MatDialogConfig): void {
    this.dialogRef = this.dialog.open(dialogComponent, {
      data,
      ...config
    });
  }

  getDialogRef() {
    return this.dialogRef;
  }

  emitDialogRef(dialogRef: MatDialogRef<any>) {
    this.dialogRefEmitter.emit(dialogRef);
  }

  emitConfirmClick() {
    this.confirmClick.emit();
  }

  emitCancelClick() {
    this.cancelClick.emit();
  }
}
