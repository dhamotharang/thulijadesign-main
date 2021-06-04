import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarRegistrationComponent } from './scholarregistration.component';

describe('ScholarRegistrationComponent', () => {
  let component: ScholarRegistrationComponent;
  let fixture: ComponentFixture<ScholarRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
