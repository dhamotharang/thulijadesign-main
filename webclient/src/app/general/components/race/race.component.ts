import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';
import { RaceModifyComponent } from '../race-modify/race-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-race',
	templateUrl: './race.component.html',
	styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit, OnDestroy {

	public races:Race[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private raceService:RaceService,
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
		this.raceService.findAll().pipe(takeUntil(this.subject)).subscribe((races) => {
			this.races = races;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.races !== undefined && this.races.length > 0) {
			sequence = +this.races[this.races.length - 1].sequence;
		}
		let element = new Race(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(RaceModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((races) => {
			if (races !== undefined) this.races = races;
		})
	}
	
	edit(element:Race) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(RaceModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((races) => {
			if (races !== undefined) this.races = races;
		})
	}
	
	delete(element:Race) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.raceService.delete(element).subscribe((races) => {
					this.races = races;
				});
			}
		});
	}

	print(element:Race) {
	}

}
