import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyViewEditComponent } from './company-view-edit/company-view-edit.component';
import { CompanyService } from './company.service';
import { DataTableService } from 'projects/subway-framework/src/lib/data-table/data-table.service';
import { DialogService } from 'projects/subway-framework/src/lib/components/dialog/dialog.service';
import { ToastrService } from 'projects/subway-framework/src/lib/toastr/toastr.service';
import {
  ColumnNameTypes,
  DataTableColumnNamesInterface
} from 'projects/subway-framework/src/lib/data-table/data-table-config';
/* import {
  DialogService, DataTableService, ToastrService, ColumnNameTypes, DataTableColumnNamesInterface
} from 'dist/subway-framework'; */


const ELEMENT_DATA = {
  currentPage: 1,
  pageSize: 10,
  rowCount: 4,
  total: 4,
  results: [{
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    status: 1,
    active: true,
    timeZone: 'E. South America Standard Time',
    teste: 'false',
    id: 1
  },
  {
    grupo: 'grupo2',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    status: 2,
    active: false,
    timeZone: 'E. South America Standard Time',
    teste: 'false',
    id: 2
  },
  {
    grupo: 'grupo3',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    status: 3,
    active: true,
    timeZone: 'E. South America Standard Time',
    teste: 'true',
    id: 3
  },
  {
    grupo: 'grupo4',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    status: 4,
    active: false,
    timeZone: 'E. South America Standard Time',
    teste: 'true',
    id: 4
  }]
};

const namesColumn: DataTableColumnNamesInterface[] = [
  { columnNameApi: 'id', displayName: 'Id', type: ColumnNameTypes.actions },
  {
    columnNameApi: 'grupo',
    displayName: 'Grupo',
    type: ColumnNameTypes.default
  },
  {
    columnNameApi: 'cnpj',
    displayName: 'CNPJ',
    type: ColumnNameTypes.cpf_cnpj
  },
  {
    columnNameApi: 'razaoSocial',
    displayName: 'Razão Social',
    type: ColumnNameTypes.actions
  },
  {
    columnNameApi: 'dataCadastro',
    displayName: 'Data Cadastro',
    type: ColumnNameTypes.date
  },
  {
    columnNameApi: 'emailResponsavel',
    displayName: 'E-Mail Responsável',
    type: ColumnNameTypes.actions
  },
  {
    columnNameApi: 'status',
    displayName: 'Status',
    type: ColumnNameTypes.status,
    enumDisplayName: [
      {
        elementName: 1,
        displayName: 'Status 1',
        colors: {
          background: 'red',
          color: 'white'
        }
      },
      {
        elementName: 2,
        displayName: 'Status 2',
        colors: {
          background: 'blue',
          color: 'white'
        }
      },
      {
        elementName: 3,
        displayName: 'Status 3',
        colors: {
          background: 'blue',
          color: 'white'
        }
      },
      {
        elementName: 4,
        displayName: 'Status 4',
        colors: {
          background: 'blue',
          color: 'white'
        }
      }
    ]
  },
  {
    columnNameApi: 'active',
    displayName: 'Ativo',
    type: ColumnNameTypes.true_false,
    enumDisplayName: [
      {
        elementName: 'true',
        displayName: 'Sim',
        colors: {
          background: 'green',
          color: 'white'
        }
      },
      {
        elementName: 'false',
        displayName: 'Não',
        colors: {
          background: 'brown',
          color: 'white'
        }
      }
    ]
  },
  {
    columnNameApi: 'teste',
    displayName: 'Teste Column',
    type: ColumnNameTypes.true_false,
    enumDisplayName: [
      {
        elementName: 'true',
        displayName: 'Ativo',
        colors: {
          background: 'pink',
          color: 'white'
        }
      },
      {
        elementName: 'false',
        displayName: 'Inativo',
        colors: {
          background: 'black',
          color: 'white'
        }
      }
    ]
  },
  {
    columnNameApi: 'timeZone',
    displayName: 'Fuso Horário',
    type: ColumnNameTypes.actions
  }
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
  // inputData = [];
  // inputData = ELEMENT_DATA;
  topActions = TOPACTIONSBUTTON;
  dataTable;
  dialogRef;
  columnNameToDisplayOnDelete = ['cnpj', 'razaoSocial'];
  statusColors = {
    1: { background: 'red', color: 'white' },
    2: { background: 'blue', color: 'white' },
    3: { background: 'yellow', color: 'white' },
    4: { background: '#eaeaea', color: 'black' }
  };

  trueFalseColors = {
    true: { background: 'red', color: 'white' },
    false: { background: 'blue', color: 'white' }
  };

  yesNoColors = {
    yes: { background: 'red', color: 'white' },
    no: { background: 'blue', color: 'white' },
    sim: { background: 'yellow', color: 'white' },
    nao: { background: '#eaeaea', color: 'black' }
  };

  contentLength;

  private count = 4;

  constructor(
    private _companyService: CompanyService,
    private dataTableService: DataTableService,
    private dialogService: DialogService,
    private toastService: ToastrService
  ) { }

  showToast(type) {
    /* this.toastService.show({
      text: `Toast message ${this.count}`,
      type: type,
    }); */
    switch (type) {
      case 'success':
        this.toastService.success('Teste de notificação sucesso.');
        break;
      case 'info':
        this.toastService.info('Teste de notificação informativa.');
        break;
      case 'error':
        this.toastService.error('Teste de notificação erro.');
        break;
      case 'warning':
        this.toastService.warn('Teste de notificação warning.');
        break;
      case 'clear':
        this.toastService.clear();
        break;
      default:
        break;
    }

    this.count += 1;
  }
  ngOnInit() {
    this.dataTableService.buttonRowEmitter.subscribe(eventType => {
      if (eventType.event === 'confirmdelete') {
        console.log('confirmdelete: ', eventType);
      }

      if (eventType.event === 'visualizar') {
        this.dialogService.openDialog(CompanyViewEditComponent, {
          name: 'animal teste nome',
          animal: 'animal teste'
        });
        this.dialogService.dialogRef.componentInstance.cancelLabel = 'Fechar';
        this.dialogService.dialogRef.componentInstance.showConfirmButton = false;
      }
    });

    this.dataTableService.afterRemoveRow.subscribe(() =>
      console.log('After Remove Event')
    );

    this.dataTableService.topButtonEmitter.subscribe(eventSlug => {
      console.log('TopButtonAction: ', eventSlug);
    });

    this.dataTableService.filterLimparEmitter.subscribe(() => {
      console.log('Botão Limpar Filtro Clicado');
    });

    this.dataTableService.filterPesquisarEmitter.subscribe(() => {
      console.log('Botão Pesquisar Filtro Clicado');
    });

    /* this._companyService.get().subscribe(inputData => {
      this.dataTableService.setInputData(inputData);
    }); */
  }

  ngAfterViewInit() {
    this.dataTableService.setInputData(ELEMENT_DATA);
  }

  addItem() {

    console.log('element 1: ', ELEMENT_DATA);
    ELEMENT_DATA.results.push({
      grupo: 'TESTE',
      razaoSocial: 'Empresa XPTO',
      emailResponsavel: 'gomes_a@subway.com',
      dataCadastro: '2019-03-31T00:00:00',
      cnpj: '82748758000177',
      status: 1,
      active: true,
      timeZone: 'E. South America Standard Time',
      teste: 'false',
      id: ELEMENT_DATA.results.length + 1
    });

    ELEMENT_DATA.rowCount += 1;

    this.dataTableService.setInputData(ELEMENT_DATA);
    // ELEMENTDATA.total_count += 1;
    // console.log('element 2: ', ELEMENTDATA);
    // console.log('data 2: ', this.data);
  }

  getPaging(element) {
    console.log('empresa: ', element);
  }
}
