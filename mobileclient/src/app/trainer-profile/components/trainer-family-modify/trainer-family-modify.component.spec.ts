import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerFamilyComponent } from './trainerfamily.component';

describe('TrainerFamilyComponent', () => {
  let component: TrainerFamilyComponent;
  let fixture: ComponentFixture<TrainerFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
