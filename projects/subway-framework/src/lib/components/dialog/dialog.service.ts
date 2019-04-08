import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService implements OnInit {
  widthDialog: string;
  dialogRefEmitter = new EventEmitter();
  confirmClick = new EventEmitter<any>();
  cancelClick = new EventEmitter<any>();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(dialogComponent, data): void {
    this.dialog.open(dialogComponent, {
      width: this.widthDialog,
      data
    });
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
