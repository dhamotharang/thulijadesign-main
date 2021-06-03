import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryRangeComponent } from './salaryrange.component';

describe('SalaryRangeComponent', () => {
  let component: SalaryRangeComponent;
  let fixture: ComponentFixture<SalaryRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
