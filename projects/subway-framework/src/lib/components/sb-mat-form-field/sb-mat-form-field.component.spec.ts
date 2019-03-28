import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbMatFormFieldComponent } from './sb-mat-form-field.component';

describe('SbMatFormFieldComponent', () => {
  let component: SbMatFormFieldComponent;
  let fixture: ComponentFixture<SbMatFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbMatFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbMatFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
