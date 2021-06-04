import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarAddressComponent } from './scholaraddress.component';

describe('ScholarAddressComponent', () => {
  let component: ScholarAddressComponent;
  let fixture: ComponentFixture<ScholarAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
