import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sb-filter-table-actions',
  templateUrl: './filter-table-actions.component.html',
  styleUrls: ['./filter-table-actions.component.scss']
})
export class FilterTableActionsComponent implements OnInit {

  @Output() limpar: EventEmitter<void> = new EventEmitter();
  @Output() pesquisa: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  pesquisar() {
    this.pesquisa.emit();
  }

  limparFiltro() {
    this.limpar.emit();
  }
}
