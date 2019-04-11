import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableService } from 'projects/subway-framework/src/lib/data-table/data-table.service';
import { DialogService } from 'projects/subway-framework/src/lib/components/dialog/dialog.service';
import { CompanyViewEditComponent } from './company-view-edit/company-view-edit.component';
import { CompanyService } from './company.service';
import { ToastrService } from 'projects/subway-framework/src/lib/toastr/toastr.service';

const ELEMENT_DATA = [
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo2',
    razaoSocial: 'Empresa XPTO 2',
    emailResponsavel: 'floresta_w@subway.com',
    dataCadastro: '2019-04-01T00:00:00',
    cnpj: '00138391000105',
    timeZone: 'E. South America Standard Time',
    id: 2
  }
];

const ELEMENT_DATA2 = [
  {
    grupo: 'grupo1',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 1
  },
  {
    grupo: 'grupo2',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 2
  },
  {
    grupo: 'grupo3',
    razaoSocial: 'Empresa XPTO',
    emailResponsavel: 'gomes_a@subway.com',
    dataCadastro: '2019-03-31T00:00:00',
    cnpj: '82748758000177',
    timeZone: 'E. South America Standard Time',
    id: 3
  }
];

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
  // inputData = [];
  // inputData = ELEMENT_DATA;
  topActions = TOPACTIONSBUTTON;
  dataTable;
  dialogRef;
  columnNameToDisplayOnDelete = ['cnpj', 'razaoSocial'];
  private count = 1;

  constructor(
    private _companyService: CompanyService,
    private dataTableService: DataTableService,
    private dialogService: DialogService,
    private toastService: ToastrService
  ) {}

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
    this.dataTableService.buttonRowEvent.subscribe(eventType => {
      if (eventType.event === 'confirmdelete') {
        console.log('confirmdelete: ', eventType);
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

    /* this._companyService.get().subscribe(inputData => {
      this.dataTableService.setInputData(inputData);
    }); */
  }

  ngAfterViewInit() {
    this.dataTableService.setInputData(ELEMENT_DATA2);
  }

  getPaging(element) {
    console.log('empresa: ', element);
  }
}
