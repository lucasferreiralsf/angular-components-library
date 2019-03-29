import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sb-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() color?: string;
  @Input() actionName: string;
  @Input() typeButton: string;
  @Input() materialTypeButton: string;
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
