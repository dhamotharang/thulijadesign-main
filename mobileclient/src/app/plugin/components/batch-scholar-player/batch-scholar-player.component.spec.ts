import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchScholarPlayerComponent } from './batchscholar.component';

describe('BatchScholarPlayerComponent', () => {
  let component: BatchScholarPlayerComponent;
  let fixture: ComponentFixture<BatchScholarPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchScholarPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchScholarPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
