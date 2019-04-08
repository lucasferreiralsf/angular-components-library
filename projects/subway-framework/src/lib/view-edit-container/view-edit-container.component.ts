import { Component, OnInit, Input, TemplateRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sb-view-edit-container',
  templateUrl: './view-edit-container.component.html',
  styleUrls: ['./view-edit-container.component.scss']
})
export class ViewEditContainerComponent implements OnInit {
  @Input() templates: TemplateRef<any>[];
  @Input() typeButton: string;

  constructor() {
  }

  ngOnInit() {
  }

}
