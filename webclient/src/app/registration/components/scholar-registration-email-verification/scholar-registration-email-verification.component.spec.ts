import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarRegistrationVerificationComponent } from './scholar-registration-email-verification.component';

describe('ScholarRegistrationVerificationComponent', () => {

	let component: ScholarRegistrationVerificationComponent;
	let fixture: ComponentFixture<ScholarRegistrationVerificationComponent>;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ScholarRegistrationVerificationComponent ]
		})
		.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(ScholarRegistrationVerificationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});