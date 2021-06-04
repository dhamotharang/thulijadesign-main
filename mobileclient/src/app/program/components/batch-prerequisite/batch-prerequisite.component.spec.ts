import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchPrerequisiteComponent } from './batchprerequisite.component';

describe('BatchPrerequisiteComponent', () => {
  let component: BatchPrerequisiteComponent;
  let fixture: ComponentFixture<BatchPrerequisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchPrerequisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchPrerequisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
