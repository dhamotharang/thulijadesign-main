import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
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

	cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
		map(({ matches }) => {
			if (matches) {
				return {
					columns: 1,
					miniCard: { cols: 1, rows: 1 },
					chart: { cols: 1, rows: 2 },
					table: { cols: 1, rows: 4 },
				};
			}
			return {
				columns: 4,
				miniCard: { cols: 1, rows: 1 },
				chart: { cols: 2, rows: 2 },
				table: { cols: 4, rows: 4 },
			};
		})
	);

	constructor(private breakpointObserver: BreakpointObserver) {}

}