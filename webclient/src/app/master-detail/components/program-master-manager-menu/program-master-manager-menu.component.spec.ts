import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMasterManagerComponent } from './programmaster.component';

describe('ProgramMasterManagerComponent', () => {
  let component: ProgramMasterManagerComponent;
  let fixture: ComponentFixture<ProgramMasterManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramMasterManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMasterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
