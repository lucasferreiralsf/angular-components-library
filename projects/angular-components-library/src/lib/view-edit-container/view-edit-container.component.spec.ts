import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditContainerComponent } from './view-edit-container.component';

describe('ViewEditContainerComponent', () => {
  let component: ViewEditContainerComponent;
  let fixture: ComponentFixture<ViewEditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
