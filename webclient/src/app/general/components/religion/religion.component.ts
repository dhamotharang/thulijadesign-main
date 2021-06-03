import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';
import { ReligionModifyComponent } from '../religion-modify/religion-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-religion',
	templateUrl: './religion.component.html',
	styleUrls: ['./religion.component.css']
})
export class ReligionComponent implements OnInit, OnDestroy {

	public religions:Religion[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private religionService:ReligionService,
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
		this.religionService.findAll().pipe(takeUntil(this.subject)).subscribe((religions) => {
			this.religions = religions;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.religions !== undefined && this.religions.length > 0) {
			sequence = +this.religions[this.religions.length - 1].sequence;
		}
		let element = new Religion(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ReligionModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((religions) => {
			if (religions !== undefined) this.religions = religions;
		})
	}
	
	edit(element:Religion) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ReligionModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((religions) => {
			if (religions !== undefined) this.religions = religions;
		})
	}
	
	delete(element:Religion) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.religionService.delete(element).subscribe((religions) => {
					this.religions = religions;
				});
			}
		});
	}

	print(element:Religion) {
	}

}
