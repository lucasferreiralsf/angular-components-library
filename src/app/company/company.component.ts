import { Component, OnInit } from '@angular/core';
import { DialogService, DataTableService } from 'subway-framework';
import { CompanyViewEditComponent } from './company-view-edit/company-view-edit.component';

const ELEMENT_DATA = [
  { id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { id: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { id: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

const namesColumn = [
  { columnNameApi: 'id', displayName: 'Posição' },
  { columnNameApi: 'name', displayName: 'Nome' },
  { columnNameApi: 'weight', displayName: 'Tamanho' },
  { columnNameApi: 'symbol', displayName: 'Símbolo' }
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

const TOPACTIONSBUTTON = [
  {
    actionName: 'Ação 1 Teste',
    eventSlug: 'acao1teste',
    buttonType: 'mat-flat-button',
    buttonColor: 'primary'
  },
  {
    actionName: 'Ação 2 Teste',
    eventSlug: 'acao2teste',
    buttonType: 'mat-button',
    buttonColor: 'accent'
  },
  { actionName: 'Ação 3 Teste', eventSlug: 'acao3teste', buttonType: 'mat-stroked-button' },
  {
    actionName: 'Ação 4 Teste',
    eventSlug: 'acao4teste',
    buttonType: 'mat-raised-button',
    buttonColor: 'primary'
  },
  {
    actionName: 'Ação 5 Teste',
    eventSlug: 'acao5teste',
    buttonType: 'mat-raised-button',
    buttonColor: 'warn'
  },
  { actionName: 'Ação 6 Teste', eventSlug: 'acao6teste', buttonType: 'mat-raised-button' }
];

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  columnNames = namesColumn;
  actions = ACTIONS;
  // inputData = [];
  inputData = ELEMENT_DATA;
  topActions = TOPACTIONSBUTTON;
  dataTable;

  constructor(private dataTableService: DataTableService, private dialogService: DialogService) {}

  ngOnInit() {
    this.dataTableService.buttonRowEvent.subscribe(eventType => {
      if (eventType.event === 'confirmdelete') {
        this.removeRow(eventType.index);
      }

      if (eventType.event === 'visualizar') {
        this.dialogService.openDialog(CompanyViewEditComponent, { name: 'animal teste nome', animal: 'animal teste' });
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
  }

  ngAfterViewInit() {
    this.dataTable = this.dataTableService.getData();
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
