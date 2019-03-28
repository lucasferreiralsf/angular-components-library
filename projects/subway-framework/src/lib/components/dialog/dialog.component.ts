import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from './dialog.service';

@Component({
  selector: 'sb-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Output() confirmClick = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit() {
    //this.tabs = this.dialogService.getTabs();
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    this.confirmClick.emit();
  }

  /* addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  } */
  /* onNoClick(): void {
    this.dialogRef.close();
  } */
}
