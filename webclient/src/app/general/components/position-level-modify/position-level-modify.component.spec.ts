import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionLevelComponent } from './positionlevel.component';

describe('PositionLevelComponent', () => {
  let component: PositionLevelComponent;
  let fixture: ComponentFixture<PositionLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
