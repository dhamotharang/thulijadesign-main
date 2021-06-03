import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerProfileMenuComponent } from './trainer-profile-menu.component';

describe('TrainerProfileMenuComponent', () => {
	
	let component: TrainerProfileMenuComponent;
	let fixture: ComponentFixture<TrainerProfileMenuComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TrainerProfileMenuComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TrainerProfileMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});