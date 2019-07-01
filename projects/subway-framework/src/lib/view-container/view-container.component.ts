import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  IDataTableInputDataInterface,
  IDataTableActionsInterface,
  IDataTableColumnNamesInterface,
  IDataTableTopActionButtonInterface
} from '../data-table/data-table-config';

@Component({
  selector: 'sb-view-container',
  templateUrl: './view-container.component.html',
  styleUrls: ['./view-container.component.scss']
})
export class ViewContainerComponent implements OnInit {
  @Input() tableSelectColumn: boolean;
  @Input() columnNames: IDataTableColumnNamesInterface[] = [];
  @Input() actions: IDataTableActionsInterface[] = [];
  @Input() inputData: IDataTableInputDataInterface[] = [];
  @Input() topActionButtons: IDataTableTopActionButtonInterface[] = [];
  @Input() columnNameToDisplayOnDelete;
  @Input() snackBarAutoHideTime;
  @Input() pageSizeOptions;
  @Input() pageSize;
  @Input() length;
  @Input() pageIndex;

  @Output() onPageChangeEmitter = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onPageChange(pageOptions) {
    this.onPageChangeEmitter.emit(pageOptions);
  }
}
