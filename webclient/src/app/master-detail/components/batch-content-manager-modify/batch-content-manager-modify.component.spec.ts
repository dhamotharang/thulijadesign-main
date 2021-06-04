import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchContentComponent } from './batchcontent.component';

describe('BatchContentComponent', () => {
  let component: BatchContentComponent;
  let fixture: ComponentFixture<BatchContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
