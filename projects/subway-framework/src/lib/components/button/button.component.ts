import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sb-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() color?: 'primary' | 'accent' | 'warn';
  @Input() actionName: string;
  @Input() typeButton: string;
  @Input() id: string;
  @Input() materialTypeButton: 'mat-button' | 'mat-raised-button' | 'mat-icon-button' | 'mat-fab' | 'mat-mini-fab' | 'mat-stroked-button' | 'mat-flat-button';
  @Input() fullWidth?: boolean;
  @Input() customStyles?: {};

  @Output() buttonClick = new EventEmitter<any>();

  constructor() {
    /* if(this.testeVariavel === 'mat-button') {
      this.matButton = true;
    } */
  }

  ngOnInit() {
  }

  topButtonClick() {
    this.buttonClick.emit();
  }
}
