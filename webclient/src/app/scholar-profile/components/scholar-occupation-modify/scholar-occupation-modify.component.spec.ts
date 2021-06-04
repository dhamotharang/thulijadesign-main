import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarOccupationComponent } from './scholaroccupation.component';

describe('ScholarOccupationComponent', () => {
  let component: ScholarOccupationComponent;
  let fixture: ComponentFixture<ScholarOccupationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarOccupationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarOccupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
