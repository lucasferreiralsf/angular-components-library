import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableRowActionsComponent } from './data-table-row-actions.component';

describe('DataTableRowActionsComponent', () => {
  let component: DataTableRowActionsComponent;
  let fixture: ComponentFixture<DataTableRowActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableRowActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableRowActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
