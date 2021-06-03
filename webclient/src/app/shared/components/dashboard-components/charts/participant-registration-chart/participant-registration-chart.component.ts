import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
	selector: 'app-participant-registration-chart',
	templateUrl: './participant-registration-chart.component.html',
	styleUrls: ['./participant-registration-chart.component.css']
})
export class ParticipantRegistrationChartComponent implements OnInit {

	public lineChartData: ChartDataSets[] = [
		{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Total Registration' },
	];
	public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	public lineChartOptions: ChartOptions = {
		responsive: true,
	};
	public lineChartColors: Color[] = [{
		borderColor: 'black',
		backgroundColor: 'rgba(255,0,0,0.3)',
	}];

	public lineChartLegend = true;
	public lineChartType: ChartType = 'line';
	public lineChartPlugins = [];

	constructor() { }

	ngOnInit() {
	}

}