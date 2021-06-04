import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarFamilyComponent } from './scholarfamily.component';

describe('ScholarFamilyComponent', () => {
  let component: ScholarFamilyComponent;
  let fixture: ComponentFixture<ScholarFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
