import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchScholarComponent } from './batchscholar.component';

describe('BatchScholarComponent', () => {
  let component: BatchScholarComponent;
  let fixture: ComponentFixture<BatchScholarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchScholarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchScholarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
