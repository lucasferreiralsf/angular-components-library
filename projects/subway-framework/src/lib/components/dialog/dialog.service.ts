import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService implements OnInit {

  animal: string;
  name: string;
  widthDialog: string;
  tabs: string[] = ['First', 'Second', 'Third'];
  component;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  getTabs() {
    return this.tabs;
  }

  openDialog(dialogComponent, data): void {
    const dialogRef = this.dialog.open(dialogComponent, {
      width: this.widthDialog,
      data
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
