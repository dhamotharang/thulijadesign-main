import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
	selector: 'app-store-sessions-chart',
	templateUrl: './store-sessions-chart.component.html',
	styleUrls: ['./store-sessions-chart.component.css']
})
export class StoreSessionsChartComponent implements OnInit {

	public barChartOptions: ChartOptions = {
		responsive: true,
	};
	public barChartLabels: Label[] = ['TP 1', 'TP 2', 'TP 3', 'TP 4', 'TP 5', 'TP 6', 'TP 7'];
	public barChartType: ChartType = 'bar';
	public barChartLegend = true;
	public barChartPlugins = [];

	public barChartData: ChartDataSets[] = [
		{ data: [65, 59, 80, 81, 56, 55, 40], label: 'PUSH' },
		{ data: [28, 48, 40, 19, 86, 27, 90], label: 'PLUS' }
	];

	constructor() { }

	ngOnInit() {
	}

}