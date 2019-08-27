import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DialogService } from './dialog.service';

@Component({
  selector: 'sb-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {

  @Input() typeButton: string;
  @Input() showCancelButton: boolean = true;
  @Input() showConfirmButton: boolean = true;
  @Input() cancelLabel: string = 'Cancelar';
  @Input() confirmLabel: string = 'Confirmar';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private dialogService: DialogService,
    private cd: ChangeDetectorRef,
  ) {
    this.showCancelButton = true;
    this.showConfirmButton = true;
    this.cancelLabel = 'Cancelar';
    this.confirmLabel = 'Confirmar';
  }

  ngOnInit() {
    this.dialogService.emitDialogRef(this.dialogRef);

    this.dialogService.showButtonsEmitter.subscribe(obj => {
      this.setShowButtons(obj.cancel, obj.confirm);
      this.cd.detectChanges();
    });

    this.dialogService.buttonsLabelsEmitter.subscribe(obj => {
      this.setButtonLabels(obj.cancel, obj.confirm);
      this.cd.detectChanges();
    });
  }

  onCancelClick() {
    this.dialogService.emitCancelClick();
  }

  onConfirmClick() {
    this.dialogService.emitConfirmClick();
  }

  setShowButtons(cancel: boolean, confirm: boolean) {
    this.showCancelButton = cancel;
    this.showConfirmButton = confirm;
  }

  setButtonLabels(cancel: string = 'Cancelar', confirm: string = 'Confirmar') {
    this.cancelLabel = cancel;
    this.confirmLabel = confirm;
  }
}
