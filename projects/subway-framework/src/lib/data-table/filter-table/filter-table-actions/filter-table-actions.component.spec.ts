import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTableActionsComponent } from './filter-table-actions.component';

describe('FilterTableActionsComponent', () => {
  let component: FilterTableActionsComponent;
  let fixture: ComponentFixture<FilterTableActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTableActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
