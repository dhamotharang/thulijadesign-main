import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { CountryModifyComponent } from '../country-modify/country-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-country',
	templateUrl: './country.component.html',
	styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit, OnDestroy {

	public countries:Country[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private countryService:CountryService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
				'code',
				'name',
				'byDefault',
				'action'
			];
			this.subject = new Subject<boolean>();
	}

	ngOnInit() {
		this.list();
	}

	ngOnDestroy() {
		this.subject.next(true);
		this.subject.unsubscribe();
	}

	list() {
		this.countryService.findAll().pipe(takeUntil(this.subject)).subscribe((countries) => {
			this.countries = countries;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.countries !== undefined && this.countries.length > 0) {
			sequence = +this.countries[this.countries.length - 1].sequence;
		}
		let element = new Country(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(CountryModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((countries) => {
			if (countries !== undefined) this.countries = countries;
		})
	}
	
	edit(element:Country) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(CountryModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((countries) => {
			if (countries !== undefined) this.countries = countries;
		})
	}
	
	delete(element:Country) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.countryService.delete(element).subscribe((countries) => {
					this.countries = countries;
				});
			}
		});
	}

	print(element:Country) {
	}

}
