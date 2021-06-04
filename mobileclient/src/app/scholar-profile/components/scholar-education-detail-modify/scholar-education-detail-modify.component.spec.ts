import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarEducationDetailComponent } from './scholareducationdetail.component';

describe('ScholarEducationDetailComponent', () => {
  let component: ScholarEducationDetailComponent;
  let fixture: ComponentFixture<ScholarEducationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarEducationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarEducationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
