import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDeliveryComponent } from './trainingdelivery.component';

describe('TrainingDeliveryComponent', () => {
  let component: TrainingDeliveryComponent;
  let fixture: ComponentFixture<TrainingDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
