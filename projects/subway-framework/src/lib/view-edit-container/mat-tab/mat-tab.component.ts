import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-mat-tab',
  templateUrl: './mat-tab.component.html',
  styleUrls: ['./mat-tab.component.scss']
})
export class MatTabComponent implements OnInit {

  @Input() label: string;
  constructor() { }

  ngOnInit() {
  }

}
