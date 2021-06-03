import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldStudyComponent } from './fieldstudy.component';

describe('FieldStudyComponent', () => {
  let component: FieldStudyComponent;
  let fixture: ComponentFixture<FieldStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
