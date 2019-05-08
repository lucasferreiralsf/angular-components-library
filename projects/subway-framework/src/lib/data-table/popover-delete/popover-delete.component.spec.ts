import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverDeleteComponent } from './popover-delete.component';

describe('PopoverDeleteComponent', () => {
  let component: PopoverDeleteComponent;
  let fixture: ComponentFixture<PopoverDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
