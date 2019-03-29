import {
  Component,
  OnInit,
  Input
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

  constructor() {}

  ngOnInit() {}
}
