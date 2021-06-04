import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';
import { ProgramMaster } from '../../../shared/models/program/program-master';
import { ProgramMasterService } from '../../../shared/services/program/program-master.service';
import { TrainingDelivery } from '../../../shared/models/program/training-delivery';
import { TrainingDeliveryService } from '../../../shared/services/program/training-delivery.service';
import { TrainingMode } from '../../../shared/models/program/training-mode';
import { TrainingModeService } from '../../../shared/services/program/training-mode.service';
import { ProgramManagerModifyComponent } from '../program-manager-modify/program-manager-modify.component';

@Component({
	selector: 'app-program-manager',
	templateUrl: './program-manager.component.html',
	styleUrls: ['./program-manager.component.css']
})
export class ProgramManagerComponent implements OnInit, OnDestroy {

	public programs:Program[];
	private listSub:Subscription;
	public columnCaptions:string[];
	private user:User;
	
	constructor(private programService:ProgramService,
		private logInService:LogInService,
		private router:Router,
		private translatePipe: TranslatePipe,
		private modalController: ModalController,
		private alertController: AlertController) {
	}

	ngOnInit() {
		this.logInService.loggedInUser.subscribe((user:User) => {
			if (user !== null) {
				this.user = user;
				this.list();
			}
		})
	}
	
	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
	}

	list() {
		this.listSub = this.programService.findAllByCreatedByOrganizationId(this.user.organization.id).subscribe((programs) => {
			this.programs = programs;
		})
	}

	async add() {
		let element = new Program(0);
		const modal = await this.modalController.create({
			component: ProgramManagerModifyComponent,
			componentProps: { program: element }
		});
		return await modal.present();
	}

	async edit(element:Program) {
		const modal = await this.modalController.create({
			component: ProgramManagerModifyComponent,
			componentProps: { program: element }
		});
		return await modal.present();
	}

	async delete(element:Program) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.programService.delete(element).subscribe((programs) => {
						this.programs = programs;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}
	
	showDetail(element:Program) {
		this.router.navigate(['/masterdetail/programmanagers', element.id])
	}

	print(element:Program) {
	}

}
