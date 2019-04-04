import { Component, OnInit } from '@angular/core';
import { DataTableService } from 'projects/subway-framework/src/lib/data-table/data-table.service';
import { DialogService } from 'projects/subway-framework/src/lib/components/dialog/dialog.service';
import { CompanyViewEditComponent } from './company-view-edit/company-view-edit.component';
import { CompanyService } from './company.service';

// const ELEMENT_DATA = [{"grupo":"grupo1","razaoSocial":"Empresa XPTO","emailResponsavel":"gomes_a@subway.com","dataCadastro":"2019-03-31T00:00:00","cnpj":"82748758000177","timeZone":"E. South America Standard Time","id":1},{"grupo":"grupo2","razaoSocial":"Empresa XPTO 2","emailResponsavel":"floresta_w@subway.com","dataCadastro":"2019-04-01T00:00:00","cnpj":"00138391000105","timeZone":"E. South America Standard Time","id":2}];

import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

const namesColumn = [
  { columnNameApi: 'id', displayName: 'Id' },
  { columnNameApi: 'grupo', displayName: 'Grupo' },
  { columnNameApi: 'cnpj', displayName: 'CNPJ' },
  { columnNameApi: 'razaoSocial', displayName: 'Razão Social' },
  { columnNameApi: 'dataCadastro', displayName: 'Data Cadastro' },
  { columnNameApi: 'emailResponsavel', displayName: 'E-Mail Responsável' },
  { columnNameApi: 'timeZone', displayName: 'Fuso Horário' }
];

const ACTIONS = [
  {
    actionName: 'Visualizar',
    actionDescription: 'Visualizar Registro',
    actionIcon: 'search',
    actionFunction: 'Click Function'
  },
  {
    actionName: 'Editar',
    actionDescription: 'Editar Registro',
    actionIcon: 'edit',
    actionFunction: 'Click Function'
  },
  {
    actionName: 'Excluir',
    actionDescription: 'Excluir Registro',
    actionIcon: 'delete',
    actionFunction: 'Click Function',
    isDelete: true,
    isDeleteTitle: 'Deletar Item',
    isDeleteDescription: 'Tem certeza que deseja excluir o item?'
  },
  {
    actionName: 'Download',
    actionDescription: 'Download Registro',
    actionIcon: 'cloud_download',
    actionFunction: 'Click Function'
  }
];

const TOPACTIONSBUTTON = [];

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {
  columnNames = namesColumn;
  actions = ACTIONS;
  inputData = [];
  // inputData = ELEMENT_DATA;
  topActions = TOPACTIONSBUTTON;
  dataTable;

  constructor(
    private _companyService: CompanyService,
    private dataTableService: DataTableService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.dataTableService.buttonRowEvent.subscribe(eventType => {
      if (eventType.event === 'confirmdelete') {
        this.removeRow(eventType.index);
      }

      if (eventType.event === 'visualizar') {
        this.dialogService.openDialog(CompanyViewEditComponent, {
          name: 'animal teste nome',
          animal: 'animal teste'
        });
      }
    });

    this.dataTableService.topButtonEvent.subscribe(eventSlug => {
      console.log('TopButtonAction: ', eventSlug);
    });

    this.dataTableService.filterLimparEvent.subscribe(() => {
      console.log('Botão Limpar Filtro Clicado');
    });

    this.dataTableService.filterPesquisarEvent.subscribe(() => {
      console.log('Botão Pesquisar Filtro Clicado');
    });

    this._companyService.get().subscribe(inputData => {
      this.dataTableService.setInputData(inputData);
    });
  }

  removeRow(item) {
    const idInputData = this.inputData.map(e => e.id);
    // tslint:disable-next-line: triple-equals
    if (idInputData.find((element, index, array) => element == item) == item) {
      this.dataTableService.data.data.splice(
        // tslint:disable-next-line: triple-equals
        idInputData.findIndex((element, index, array) => element == item),
        1
      );
      this.dataTableService.data.data = this.dataTableService.data.data;
    }
  }
}
