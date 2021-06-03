import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerEducationDetailComponent } from './trainereducationdetail.component';

describe('TrainerEducationDetailComponent', () => {
  let component: TrainerEducationDetailComponent;
  let fixture: ComponentFixture<TrainerEducationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerEducationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerEducationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
