import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchModuleComponent } from './batchmodule.component';

describe('BatchModuleComponent', () => {
  let component: BatchModuleComponent;
  let fixture: ComponentFixture<BatchModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
