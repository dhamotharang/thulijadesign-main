import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationTypeComponent } from './occupationtype.component';

describe('OccupationTypeComponent', () => {
  let component: OccupationTypeComponent;
  let fixture: ComponentFixture<OccupationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
