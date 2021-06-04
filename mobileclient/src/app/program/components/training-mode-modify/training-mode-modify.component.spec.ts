import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingModeComponent } from './trainingmode.component';

describe('TrainingModeComponent', () => {
  let component: TrainingModeComponent;
  let fixture: ComponentFixture<TrainingModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
