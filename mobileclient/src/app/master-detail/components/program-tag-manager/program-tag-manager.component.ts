import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ProgramTag } from '../../../shared/models/program/program-tag';
import { ProgramTagService } from '../../../shared/services/program/program-tag.service';
import { ProgramMaster } from '../../../shared/models/program/program-master';
import { ProgramMasterService } from '../../../shared/services/program/program-master.service';

import { ProgramTagManagerModifyComponent } from '../program-tag-manager-modify/program-tag-manager-modify.component';

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

	constructor(private programMasterService:ProgramMasterService,
		private programTagService:ProgramTagService,
		private router:Router, private route: ActivatedRoute,
		private translatePipe: TranslatePipe,
		private modalController: ModalController,
		private alertController: AlertController) {
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

	async add() {
		let sequence:number = 1;
		if (this.programTags !== undefined && this.programTags.length > 0) {
			sequence = +this.programTags[this.programTags.length - 1].sequence;
		}
		let element = new ProgramTag(0, undefined, this.programMaster, undefined );
		element.options = { masterDetail: "ProgramMaster" };
		const modal = await this.modalController.create({
			component: ProgramTagManagerModifyComponent,
			componentProps: { programTag: element }
		});
		return await modal.present();

		/*
		if (programTags !== undefined) this.programTags = programTags;
		*/
	}
	
	async edit(element:ProgramTag) {
		element.options = { masterDetail: "ProgramMaster" };
		const modal = await this.modalController.create({
			component: ProgramTagManagerModifyComponent,
			componentProps: { programTag: element }
		});
		return await modal.present();

		/*
		if (programTags !== undefined) this.programTags = programTags;
		*/
	}
	
	async delete(element:ProgramTag) {
		element.options = { masterDetail: "ProgramMaster" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.programTagService.delete(element).subscribe((programTags) => {
						if (programTags !== undefined) this.programTags = programTags;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}
	
	showDetail(element:ProgramTag) {
	}
	
	print(element:ProgramTag) {
	}

}
