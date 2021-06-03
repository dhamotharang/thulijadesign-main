import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OrdersTableDataSource, OrdersTableItem } from './orders-table-datasource';

@Component({
	selector: 'app-orders-table',
	templateUrl: './orders-table.component.html',
	styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements AfterViewInit, OnInit {

	dataSource: OrdersTableDataSource;
	dataLength: number;

	displayedColumns = [
		"id",
		"name"
	];

	constructor(){}

	ngOnInit() {
		this.dataSource = new OrdersTableDataSource();
		this.dataLength = 20;
	}

	ngAfterViewInit() {
	}

}