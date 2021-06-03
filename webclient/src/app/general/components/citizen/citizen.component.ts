import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';
import { CitizenModifyComponent } from '../citizen-modify/citizen-modify.component';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-citizen',
	templateUrl: './citizen.component.html',
	styleUrls: ['./citizen.component.css']
})
export class CitizenComponent implements OnInit, OnDestroy {

	public citizens:Citizen[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private citizenService:CitizenService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
				'country',
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
		this.citizenService.findAll().pipe(takeUntil(this.subject)).subscribe((citizens) => {
			this.citizens = citizens;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.citizens !== undefined && this.citizens.length > 0) {
			sequence = +this.citizens[this.citizens.length - 1].sequence;
		}
		let element = new Citizen(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(CitizenModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((citizens) => {
			if (citizens !== undefined) this.citizens = citizens;
		})
	}
	
	edit(element:Citizen) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(CitizenModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((citizens) => {
			if (citizens !== undefined) this.citizens = citizens;
		})
	}
	
	delete(element:Citizen) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.citizenService.delete(element).subscribe((citizens) => {
					this.citizens = citizens;
				});
			}
		});
	}

	print(element:Citizen) {
	}

}
