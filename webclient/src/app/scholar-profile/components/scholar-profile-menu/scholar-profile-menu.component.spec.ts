import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarProfileMenuComponent } from './scholar-profile-menu.component';

describe('ScholarProfileMenuComponent', () => {
	
	let component: ScholarProfileMenuComponent;
	let fixture: ComponentFixture<ScholarProfileMenuComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ScholarProfileMenuComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ScholarProfileMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});