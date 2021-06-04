import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarDetailComponent } from './scholardetail.component';

describe('ScholarDetailComponent', () => {
  let component: ScholarDetailComponent;
  let fixture: ComponentFixture<ScholarDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
