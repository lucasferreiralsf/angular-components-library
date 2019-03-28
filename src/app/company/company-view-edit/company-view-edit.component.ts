import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-company-view-edit',
  templateUrl: './company-view-edit.component.html',
  styleUrls: ['./company-view-edit.component.scss']
})
export class CompanyViewEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) {

   }

  ngOnInit() {
  }

  modalConfirmClick() {
    console.log('Botão confirmar clicado!');
  }

}
