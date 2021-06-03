import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerAddressComponent } from './traineraddress.component';

describe('TrainerAddressComponent', () => {
  let component: TrainerAddressComponent;
  let fixture: ComponentFixture<TrainerAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
