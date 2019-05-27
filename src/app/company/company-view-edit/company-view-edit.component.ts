import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// import { DialogService } from 'projects/subway-framework/src/lib/components/dialog/dialog.service';
import {
  DialogService
} from 'dist/subway-framework';
@Component({
  selector: 'app-company-view-edit',
  templateUrl: './company-view-edit.component.html',
  styleUrls: ['./company-view-edit.component.scss']
})
export class CompanyViewEditComponent implements OnInit {
  dialogRef: MatDialogRef<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.dialogService.dialogRefEmitter.subscribe(dialogRef => {
      this.dialogRef = dialogRef;
      this.dialogRef.afterClosed().subscribe(() => console.log('after closed'));
    });

    this.dialogService.confirmClick.subscribe(() => {
      this.dialogRef.close();
    });

    this.dialogService.cancelClick.subscribe(() => {
      this.dialogRef.close();
    });
  }

  closeDialog() {
    this.dialogRef = this.dialogService.getDialogRef();
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(() => { console.log('AFTER CLOSED') })
  }

}
