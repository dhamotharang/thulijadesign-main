import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRegistrationChartComponent } from './participant-registration-chart.component';

describe('ParticipantRegistrationChartComponent', () => {

	let component: ParticipantRegistrationChartComponent;
	let fixture: ComponentFixture<ParticipantRegistrationChartComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ParticipantRegistrationChartComponent ]
		}).compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(ParticipantRegistrationChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});