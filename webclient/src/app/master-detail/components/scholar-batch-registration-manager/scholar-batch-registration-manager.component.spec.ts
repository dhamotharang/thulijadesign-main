import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarBatchRegistrationComponent } from './scholarbatchregistration.component';

describe('ScholarBatchRegistrationComponent', () => {
  let component: ScholarBatchRegistrationComponent;
  let fixture: ComponentFixture<ScholarBatchRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarBatchRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarBatchRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
