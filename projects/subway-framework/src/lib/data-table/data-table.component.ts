import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Renderer2,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatTableDataSource,
  MatPaginator,
  MatSnackBar,
  MatSnackBarConfig,
  PageEvent
} from '@angular/material';
import { DataTableService } from './data-table.service';
import { map } from 'rxjs/operators';
import { PopoverDeleteService } from './popover-delete/popover-delete.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { flipInX, flipOutX } from 'ng-animate';
import { CpfCnpjPipe } from '../pipes/cpf-cnpj.pipe';

export interface DataTableColumnNamesInterface {
  columnNameApi: string;
  displayName: string;
  type: ColumnNameTypes;
  enumDisplayName?: EnumDisplayName[];
}

export interface EnumDisplayName {
  elementName: any;
  displayName: string;
  colors: { background: string; color: string };
}

export enum ColumnNameTypes {
  'yes_no',
  'true_false',
  'status',
  'cpf',
  'cnpj',
  'cpf_cnpj',
  'date',
  'select',
  'actions',
  'default'
}

export interface DataTableInputDataInterface {
  id: number;
  actions: DataTableActionsInterface;
}

export interface DataTableActionsInterface {
  actionName: string;
  actionDescription: string;
  actionIcon: string;
  actionFunction: any;
  isDelete?: boolean;
  isDeleteTitle?: string;
  isDeleteDescription?: string;
}

export interface DataTableTopActionButtonInterface {
  actionName: string;
  eventSlug: string;
  buttonType: string;
  buttonColor?: string;
}

@Component({
  selector: 'sb-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    trigger('flipInOut', [
      transition(
        'void => *',
        useAnimation(flipInX, {
          params: { timing: 0.3, delay: 0, a: '10px', b: '0' }
        })
      ),
      transition(
        '* => void',
        useAnimation(flipOutX, {
          params: { timing: 0.3, delay: 0 }
        })
      )
    ])
  ],
  providers: [CpfCnpjPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {
  @Input() selectColumn = false;
  @Input() columnNames: DataTableColumnNamesInterface[] = [];
  @Input() actions: DataTableActionsInterface[] = [];
  @Input() inputData: DataTableInputDataInterface[] = [];
  @Input() topActionButtons: DataTableTopActionButtonInterface[] = [];
  @Input() columnNameToDisplayOnDelete: string[];
  @Input() snackBarAutoHideTime: number;
  @Input() pageEvent: PageEvent;
  @Input() pageSize;
  @Input() length;
  @Input() pageSizeOptions;

  @Output() getPagingEmit = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  data: MatTableDataSource<any>;
  displayedColumns = [];
  columnsToDisplay = [];
  selection = new SelectionModel(true, []);
  columnsNameApi: { name: string; type: ColumnNameTypes }[] = [];
  noData;
  buttonDismissClicked = false;
  private indexElementRemoved: number;

  columnNameTypes = ColumnNameTypes;

  topButtonStyle: {} = {
    height: '32px',
    'line-height': '32px'
  };

  constructor(
    private dataTableService: DataTableService,
    private popoverService: PopoverDeleteService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.data = this.dataTableService.setDataSource(this.inputData);
    this.dataTableService.inputDataEmitter.subscribe(inputData => {
      this.load(inputData);
    });
  }

  getPaging(paging) {
    this.getPagingEmit.emit(paging);
  }

  load(inputData) {
    this.inputData = inputData;
    this.data = this.dataTableService.setDataSource(this.inputData);
    this.noData = this.data.connect().pipe(map(data => data.length === 0));
    this.data.paginator = this.paginator;
    Object.assign(
      this.columnsNameApi,
      this.columnNames.map(e =>
        Object.assign({}, { name: e.columnNameApi, type: e.type })
      )
    );

    this.displayColumns();
    this.addActionsToData();
    this.popoverService.buttonClickEmitter.subscribe(event => {
      this.buttonRowClick(event.event, event.element);
    });
  }

  filterLimparButtonClick() {
    this.dataTableService.filterLimparButtonClick();
  }

  filterPesquisarButtonClick() {
    this.dataTableService.filterPesquisarButtonClick();
  }

  topButtonClick(eventSlug: string) {
    this.dataTableService.topButtonClick(eventSlug);
  }

  getNameToDisplayOnDelete(element: string[]) {
    const filtered = Object.keys(element)
      .filter(key => this.columnNameToDisplayOnDelete.includes(key))
      .reduce((obj, key) => {
        const displayName = this.verifyNameColumn(key, 'header');
        obj[key] = displayName + ': ' + element[key];
        return obj;
      }, {});

    const teste = Object.values(filtered).join(' - ');
    return teste;
  }

  buttonRowClick(event: string, element) {
    if (event === 'confirmdelete') {
      const configSnackbar = new MatSnackBarConfig();
      configSnackbar.duration = this.snackBarAutoHideTime
        ? this.snackBarAutoHideTime
        : 4000;
      this.snackBar.open(
        `O item: ${this.getNameToDisplayOnDelete(element)} foi excluído.`,
        'Desfazer',
        configSnackbar
      );
      this.removeRow(element.id);
      this.snackBar._openedSnackBarRef.afterDismissed().subscribe(() => {
        if (this.buttonDismissClicked === false) {
          this.dataTableService.removeRowEmit(element);
        } else {
          this.buttonDismissClicked = false;
        }
      });
      this.snackBar._openedSnackBarRef.onAction().subscribe(() => {
        this.buttonDismissClicked = true;
        this.rollbackRow(element);
        this.snackBar.dismiss();
      });
    } else {
      this.dataTableService.buttonRowClick(event.toLowerCase(), element);
    }
  }

  cssStyle(element, column) {
    switch (column.type) {
      case ColumnNameTypes.status:
        const statusColumnIndex = this.columnNames
          .map(e => e.columnNameApi)
          .indexOf(column.name);
        const statusEnumIndex = this.columnNames[
          statusColumnIndex
        ].enumDisplayName
          .map(e => e.elementName.toString())
          .indexOf(element.toString());
        const statusColors = this.columnNames[statusColumnIndex]
          .enumDisplayName[statusEnumIndex].colors;
        return {
          background: statusColors.background,
          color: statusColors.color
        };
      case ColumnNameTypes.true_false:
        const trueFalseColumnIndex = this.columnNames
          .map(e => e.columnNameApi)
          .indexOf(column.name);
        const trueFalseEnumIndex = this.columnNames[
          trueFalseColumnIndex
        ].enumDisplayName
          .map(e => e.elementName.toString())
          .indexOf(element.toString());
        const trueFalsecolors = this.columnNames[trueFalseColumnIndex]
          .enumDisplayName[trueFalseEnumIndex].colors;
        return {
          background: trueFalsecolors.background,
          color: trueFalsecolors.color
        };
      case ColumnNameTypes.yes_no:
        const yesNoColumnIndex = this.columnNames
          .map(e => e.columnNameApi)
          .indexOf(column.name);
        const yesNoEnumIndex = this.columnNames[
          yesNoColumnIndex
        ].enumDisplayName
          .map(e => e.elementName.toString())
          .indexOf(element.toString());
        const yesNocolors = this.columnNames[yesNoColumnIndex]
          .enumDisplayName[yesNoEnumIndex].colors;
        return {
          background: yesNocolors.background,
          color: yesNocolors.color
        };
      default:
        return;
    }
  }

  removeRow(item) {
    const idInputData = this.inputData.map(e => e.id);
    this.indexElementRemoved = idInputData.findIndex(
      (element, index, array) => element === item
    );
    // tslint:disable-next-line: triple-equals
    if (idInputData.find((element, index, array) => element == item) == item) {
      this.dataTableService.data.data.splice(this.indexElementRemoved, 1);
      this.dataTableService.data.data = this.dataTableService.data.data;
    }
  }

  rollbackRow(item) {
    this.dataTableService.data.data.splice(this.indexElementRemoved, 0, item);
    this.dataTableService.data.data = this.dataTableService.data.data;
  }

  addActionsToData() {
    this.data.data.map(e => {
      // tslint:disable-next-line: no-string-literal
      e['actions'] = Object.assign({}, this.actions);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.data.forEach(row => this.selection.select(row));
  }

  displayColumns() {
    if (this.selectColumn === true) {
      this.addSelectToDisplayedColumns();
    }

    if (this.actions.length >= 0) {
      this.addActionsToDisplayedColumns();
    }
  }

  addSelectToDisplayedColumns() {
    let select = [{ name: 'select', type: ColumnNameTypes.select }];

    if (this.columnsNameApi && this.columnsNameApi.length !== 0) {
      select = select.concat(this.columnsNameApi);
      this.columnsNameApi = select;
      this.displayedColumns = this.columnsNameApi;
      this.columnsToDisplay = this.displayedColumns.map(e => e.name).slice();
    }
  }

  addActionsToDisplayedColumns() {
    const actions = [{ name: 'actions', type: ColumnNameTypes.actions }];

    if (this.columnsNameApi && this.columnsNameApi.length !== 0) {
      this.columnsNameApi = this.columnsNameApi.concat(actions);
      this.displayedColumns = this.columnsNameApi;
      this.columnsToDisplay = this.displayedColumns.map(e => e.name).slice();
    }
  }

  verifyNameColumn(element, type, column?) {
    if (type === 'header') {
      const columnNameApiArray: string[] = this.columnNames.map(
        e => e.columnNameApi
      );
      const indexcolumnNameApi: number = columnNameApiArray.indexOf(element);

      if (indexcolumnNameApi >= 0) {
        return this.columnNames[indexcolumnNameApi].displayName;
      } else {
        return element;
      }
    }

    if (type === 'row') {
      switch (column.type) {
        case ColumnNameTypes.status:
          const statusColumnIndex = this.columnNames
            .map(e => e.columnNameApi)
            .indexOf(column.name);
          const statusEnumIndex = this.columnNames[
            statusColumnIndex
          ].enumDisplayName
            .map(e => e.elementName.toString())
            .indexOf(element.toString());
          return this.columnNames[statusColumnIndex].enumDisplayName[
            statusEnumIndex
          ].displayName;
        case ColumnNameTypes.true_false:
          const trueFalseColumnIndex = this.columnNames
            .map(e => e.columnNameApi)
            .indexOf(column.name);
          const trueFalseEnumIndex = this.columnNames[
            trueFalseColumnIndex
          ].enumDisplayName
            .map(e => e.elementName.toString())
            .indexOf(element.toString());
          return this.columnNames[trueFalseColumnIndex].enumDisplayName[
            trueFalseEnumIndex
          ].displayName;
        case ColumnNameTypes.yes_no:
          const yesNoColumnIndex = this.columnNames
            .map(e => e.columnNameApi)
            .indexOf(column.name);
          const yesNoEnumIndex = this.columnNames[
            yesNoColumnIndex
          ].enumDisplayName
            .map(e => e.elementName.toString())
            .indexOf(element.toString());
          return this.columnNames[yesNoColumnIndex].enumDisplayName[
            yesNoEnumIndex
          ].displayName;

        default:
          return element;
      }
    }
  }

  addColumn() {
    const randomColumn = Math.floor(
      Math.random() * this.displayedColumns.length
    );
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }
}
