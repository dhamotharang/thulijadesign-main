import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-participant-registration-chart',
	templateUrl: './participant-registration-chart.component.html',
	styleUrls: ['./participant-registration-chart.component.css']
})
export class ParticipantRegistrationChartComponent implements OnInit {

	public lineChartLegend = true;
	public lineChartPlugins = [];

	constructor() { }

	ngOnInit() {
	}

}