import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  AfterViewInit,
  Input,
  Output
} from '@angular/core';
import { MatFormField } from '@angular/material';

@Component({
  selector: 'sb-mat-form-field',
  templateUrl: './sb-mat-form-field.component.html',
  styleUrls: ['./sb-mat-form-field.component.scss']
})
export class MatFormFieldComponent implements OnInit, AfterViewInit {

  @Input() appearence?: string;
  @Input() showHint ? = false;
  @Input() hint?: string;
  @Input() matSuffix?: boolean;
  @Input() matPrefix?: boolean;
  @Input() iconName?: string;
  @Input() placeHolder?: string;
  @Input() formName: string;
  @Output() ngModel;
  @ViewChildren(MatFormField) formfields: QueryList<MatFormField>;

  constructor(protected cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.formfields.forEach((ff: MatFormField) => {
      ff.updateOutlineGap();
    });
    this.cdr.detectChanges();
  }
}
