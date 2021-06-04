import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramTagComponent } from './programtag.component';

describe('ProgramTagComponent', () => {
  let component: ProgramTagComponent;
  let fixture: ComponentFixture<ProgramTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
