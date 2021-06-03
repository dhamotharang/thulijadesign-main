import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
	selector: 'app-product-sales-chart',
	templateUrl: './product-sales-chart.component.html',
	styleUrls: ['./product-sales-chart.component.css']
})
export class ProductSalesChartComponent implements OnInit {

	public radarChartOptions: ChartOptions = {
		responsive: true,
	};
	public radarChartLabels: Label[] = ['Program 1', 'Program 2', 'Program 3', 'Program 4', 'Program 5', 'Program 6', 'Program 7'];

	public radarChartData: ChartDataSets[] = [
		{ data: [65, 59, 90, 81, 56, 55, 40], label: 'PUSH' },
		{ data: [28, 48, 40, 19, 96, 27, 100], label: 'PLUS' }
	];
	public radarChartType: ChartType = 'radar';

	constructor() { }

	ngOnInit() {
	}

}