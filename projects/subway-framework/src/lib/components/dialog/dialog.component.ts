import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DialogService } from './dialog.service';

@Component({
  selector: 'sb-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() typeButton: string;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.dialogService.emitDialogRef(this.dialogRef);
  }

  onCancelClick() {
    this.dialogService.emitCancelClick();
  }

  onConfirmClick() {
    this.dialogService.emitConfirmClick();
  }
}
