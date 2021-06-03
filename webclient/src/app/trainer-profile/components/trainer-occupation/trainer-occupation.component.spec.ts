import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerOccupationComponent } from './traineroccupation.component';

describe('TrainerOccupationComponent', () => {
  let component: TrainerOccupationComponent;
  let fixture: ComponentFixture<TrainerOccupationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerOccupationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerOccupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
