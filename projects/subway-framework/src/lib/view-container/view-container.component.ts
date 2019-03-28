import { ColumnNamesInterface, TopActionButtonInterface } from './../data-table/data-table.component';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { InputData, ActionsInterface } from '../data-table/data-table.component';



@Component({
  selector: 'sb-view-container',
  templateUrl: './view-container.component.html',
  styleUrls: ['./view-container.component.scss']
})
export class ViewContainerComponent implements OnInit {
  @Input() tableSelectColumn: boolean;
  @Input() columnNames: ColumnNamesInterface[] = [];
  @Input() actions: ActionsInterface[] = [];
  @Input() inputData: InputData[] = [];
  @Input() topActionButtons: TopActionButtonInterface[] = [];

  constructor() {
  }

  ngOnInit() {}
}
