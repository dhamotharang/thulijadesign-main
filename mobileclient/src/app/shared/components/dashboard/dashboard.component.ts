import { Component } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

	miniCardData = [
		{ title: "Total Reach", value: "3251", isIncrease: true, 
			color: "primary", percentValue: "0.5383", icon: "payments", isCurrency: true },
		{ title: "Shown Interest", value: "1807", isIncrease: false, 
			color: "accent", percentValue: "0.2544", icon: "local_atm", isCurrency: true },
		{ title: "Eligible Candidates", value: "967", isIncrease: true, 
			color: "warn", percentValue: "0.4565", icon: "shopping_cart", isCurrency: false },
		{ title: "Enrolled Scholars", value: "280", isIncrease: false, 
			color: "primary", percentValue: "0.8361", icon: "portrait", isCurrency: false }
	];

	constructor() {}

}