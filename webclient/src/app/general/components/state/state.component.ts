import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { StateModifyComponent } from '../state-modify/state-modify.component';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-state',
	templateUrl: './state.component.html',
	styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit, OnDestroy {

	public states:State[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private stateService:StateService,
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
		this.stateService.findAll().pipe(takeUntil(this.subject)).subscribe((states) => {
			this.states = states;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.states !== undefined && this.states.length > 0) {
			sequence = +this.states[this.states.length - 1].sequence;
		}
		let element = new State(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(StateModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((states) => {
			if (states !== undefined) this.states = states;
		})
	}
	
	edit(element:State) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(StateModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((states) => {
			if (states !== undefined) this.states = states;
		})
	}
	
	delete(element:State) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.stateService.delete(element).subscribe((states) => {
					this.states = states;
				});
			}
		});
	}

	print(element:State) {
	}

}
