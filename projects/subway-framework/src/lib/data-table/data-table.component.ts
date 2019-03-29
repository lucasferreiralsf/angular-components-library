import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataTableService } from './data-table.service';
import { map } from 'rxjs/operators';
import { PopoverService } from './popover/popover.service';
import { trigger, transition, useAnimation, state } from '@angular/animations';
import { flipInX, flipOutX } from 'ng-animate';

export class DataTableColumnNamesInterface {
  columnNameApi: string;
  displayName: string;
}

export class DataTableInputDataInterface {
  id: number;
  actions: DataTableActionsInterface;
}

export class DataTableActionsInterface {
  actionName: string;
  actionDescription: string;
  actionIcon: string;
  actionFunction: any;
  isDelete?: boolean;
  isDeleteTitle?: string;
  isDeleteDescription?: string;
}

export class DataTableTopActionButtonInterface {
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
  ]
})
export class DataTableComponent implements OnInit {
  @Input() selectColumn = false;
  @Input() columnNames: DataTableColumnNamesInterface[] = [];
  @Input() actions: DataTableActionsInterface[] = [];
  @Input() inputData: DataTableInputDataInterface[] = [];
  @Input() topActionButtons: DataTableTopActionButtonInterface[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  data: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  selection = new SelectionModel(true, []);
  columnsNameApi: string[] = [];
  noData;

  topButtonStyle: {} = {
    height: '32px',
    'line-height': '32px'
  };

  constructor(
    private dataTableService: DataTableService,
    private popoverService: PopoverService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.columnsNameApi = this.columnNames.map(e => e.columnNameApi);
    this.data = this.dataTableService.setDataSource(this.inputData);
    this.noData = this.data.connect().pipe(map(data => data.length === 0));
    this.data.paginator = this.paginator;
    this.addActionsToData();
    this.displayColumns();
    this.popoverService.buttonClickEvent.subscribe(event => {
      this.buttonRowClick(event.event, event.elementId);
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

  buttonRowClick(event: string, index) {
    // console.log(`buttonRowClick: ${event.toLowerCase()}, ${index.toLowerCase()}`);
    this.dataTableService.buttonRowClick(event.toLowerCase(), index);
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
    if (this.selectColumn) {
      this.addSelectToDisplayedColumns();
    }

    if (this.actions.length >= 0) {
      this.addActionsToDisplayedColumns();
    }
  }

  addSelectToDisplayedColumns() {
    const select = ['select'];

    if (this.columnsNameApi && this.columnsNameApi.length !== 0) {
      this.columnsNameApi = select.concat(this.columnsNameApi);
      this.displayedColumns = this.columnsNameApi;
      this.columnsToDisplay = this.displayedColumns.slice();
    } else {
      this.displayedColumns = select.concat(Object.keys(this.data[0]));
      this.columnsToDisplay = this.displayedColumns.slice();
    }
  }

  addActionsToDisplayedColumns() {
    const actions = ['actions'];

    if (this.columnsNameApi && this.columnsNameApi.length !== 0) {
      this.columnsNameApi.push(actions[0]);
      this.displayedColumns = this.columnsNameApi;
      this.columnsToDisplay = this.displayedColumns.slice();
    } else {
      this.displayedColumns = actions.concat(Object.keys(this.data[0]));
      this.columnsToDisplay = this.displayedColumns.slice();
    }
  }

  verifyNameColumn(columnNameApi) {
    const columnNameApiArray: string[] = this.columnNames.map(
      e => e.columnNameApi
    );
    const indexcolumnNameApi: number = columnNameApiArray.indexOf(
      columnNameApi
    );

    if (indexcolumnNameApi >= 0) {
      return this.columnNames[indexcolumnNameApi].displayName;
    } else {
      return columnNameApi;
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
