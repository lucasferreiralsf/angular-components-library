import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'sb-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() typeButton: string;

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
