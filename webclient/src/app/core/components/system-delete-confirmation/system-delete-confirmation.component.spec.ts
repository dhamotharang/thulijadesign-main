import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDeleteConfirmationComponent } from './system-delete-confirmation.component';

describe('SystemDeleteConfirmationComponent', () => {
  let component: SystemDeleteConfirmationComponent;
  let fixture: ComponentFixture<SystemDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
