import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  DataTableInputDataInterface,
  DataTableActionsInterface,
  DataTableColumnNamesInterface,
  DataTableTopActionButtonInterface
} from '../data-table/data-table.component';

@Component({
  selector: 'sb-view-container',
  templateUrl: './view-container.component.html',
  styleUrls: ['./view-container.component.scss']
})
export class ViewContainerComponent implements OnInit {
  @Input() tableSelectColumn: boolean;
  @Input() columnNames: DataTableColumnNamesInterface[] = [];
  @Input() actions: DataTableActionsInterface[] = [];
  @Input() inputData: DataTableInputDataInterface[] = [];
  @Input() topActionButtons: DataTableTopActionButtonInterface[] = [];
  @Input() columnNameToDisplayOnDelete;
  @Input() snackBarAutoHideTime;
  @Input() pageSize;
  @Input() length;
  @Input() pageSizeOptions;
  @Input() statusType;

  @Output() getPagingEmit = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  getPaging(element) {
    this.getPagingEmit.emit(element);
  }
}
