import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyViewEditComponent } from './company-view-edit.component';

describe('CompanyViewEditComponent', () => {
  let component: CompanyViewEditComponent;
  let fixture: ComponentFixture<CompanyViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
