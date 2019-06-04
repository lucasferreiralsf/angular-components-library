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
} from '../data-table/data-table-config';

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
  @Input() pageSizeOptions;
  @Input() pageSize;
  @Input() length;

  @Output() onPageChangeEmitter = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onPageChange(pageOptions) {
    this.onPageChangeEmitter.emit(pageOptions);
  }
}
