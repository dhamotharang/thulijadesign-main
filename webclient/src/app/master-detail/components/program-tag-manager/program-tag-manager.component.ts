import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ProgramTag } from '../../../shared/models/program/program-tag';
import { ProgramTagService } from '../../../shared/services/program/program-tag.service';
import { ProgramMaster } from '../../../shared/models/program/program-master';
import { ProgramMasterService } from '../../../shared/services/program/program-master.service';

import { ProgramTagManagerModifyComponent } from '../program-tag-manager-modify/program-tag-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-program-tag-manager',
	templateUrl: './program-tag-manager.component.html',
	styleUrls: ['./program-tag-manager.component.css']
})
export class ProgramTagManagerComponent implements OnInit, OnDestroy {

	public programMaster:ProgramMaster;
	public programMasterId:number;
	public programTag:ProgramTag;
	public programTagId:number;

	public programTags:ProgramTag[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private programMasterService:ProgramMasterService,
		private programTagService:ProgramTagService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
				'programMaster',
				'name',
				'action'
			];
	}
	
	ngOnInit() {
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.programMasterId = +params.get('id');
			this.masterSub = this.programMasterService.findById(this.programMasterId).subscribe((programMaster) => {
				this.programMaster = programMaster;
				this.list();
			});
		});
	}
	
	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
		if (this.masterSub) {
			this.masterSub.unsubscribe();
		}
		if (this.detailSub) {
			this.detailSub.unsubscribe();
		}
	}
	
	list() {
		this.listSub = this.programTagService.findByProgramMasterId(this.programMaster.id).subscribe((programTags) => {
			this.programTags = programTags;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.programTags !== undefined && this.programTags.length > 0) {
			sequence = +this.programTags[this.programTags.length - 1].sequence;
		}
		let element = new ProgramTag(0, undefined, this.programMaster, undefined );
		element.options = { masterDetail: "ProgramMaster" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ProgramTagManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((programTags) => {
			if (programTags !== undefined) this.programTags = programTags;
		})
	}
	
	edit(element:ProgramTag) {
		element.options = { masterDetail: "ProgramMaster" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ProgramTagManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((programTags) => {
			if (programTags !== undefined) this.programTags = programTags;
		})
	}
	
	delete(element:ProgramTag) {
		element.options = { masterDetail: "ProgramMaster" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.programTagService.delete(element).subscribe((programTags) => {
					if (programTags !== undefined) this.programTags = programTags;
				});
			}
		});
	}
	
	showDetail(element:ProgramTag) {
	}
	
	print(element:ProgramTag) {
	}

}
