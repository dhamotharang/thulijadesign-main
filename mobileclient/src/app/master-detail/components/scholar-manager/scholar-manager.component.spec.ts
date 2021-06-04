import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarManagerComponent } from './scholar.component';

describe('ScholarManagerComponent', () => {
  let component: ScholarManagerComponent;
  let fixture: ComponentFixture<ScholarManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
