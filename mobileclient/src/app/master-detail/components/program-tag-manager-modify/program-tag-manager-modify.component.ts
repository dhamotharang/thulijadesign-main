import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { ProgramTag } from '../../../shared/models/program/program-tag';
import { ProgramTagService } from '../../../shared/services/program/program-tag.service';
import { ProgramMaster } from '../../../shared/models/program/program-master';
import { ProgramMasterService } from '../../../shared/services/program/program-master.service';

@Component({
	selector: 'app-program-tag-manager-modify',
	templateUrl: './program-tag-manager-modify.component.html',
	styleUrls: ['./program-tag-manager-modify.component.css']
})
export class ProgramTagManagerModifyComponent implements OnInit {

	public programTagForm:FormGroup;
	public programTag:ProgramTag;
	public programMasters:ProgramMaster[];
	public currentProgramMaster:ProgramMaster;
	public errorMessage:string;

	compareProgramMaster = (currentprogramMaster: ProgramMaster, programMaster: ProgramMaster) => currentprogramMaster.id == programMaster.id;

	constructor(private programTagService:ProgramTagService,
			private programMasterService:ProgramMasterService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.programTag = this.navParams.get('programTag');
		this.programMasterService.findAllByLookup().subscribe(programMasters => {
			this.programMasters = programMasters;
		})
	}

	ngOnInit() {
		if (this.programTag.id === 0) {
			this.programTagForm = this.createProgramTagForm();
		} else {
			this.programTagForm = this.editProgramTagForm();
		}
	}

	createProgramTagForm():FormGroup {
		let programTagForm = new FormGroup({
			sequence: new FormControl(this.programTag.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(2000),
					Validators.pattern("^[0-9]*$")
				]
			}),
			programMaster: new FormControl('', {
				validators: [
				]
			}),
			name: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(120)
				]
			})
		})
		return programTagForm;
	}

	editProgramTagForm():FormGroup {
		this.currentProgramMaster = this.programTag.programMaster;
		let programTagForm = new FormGroup({
			sequence: new FormControl(this.programTag.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			programMaster: new FormControl(this.programTag.programMaster, [
			]), 
			name: new FormControl(this.programTag.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(120)
			])
		})
		return programTagForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.programTagForm.controls[controlName].hasError(errorName);
	}

	public save(programTag:ProgramTag) {
		programTag.programMaster = this.programTag.programMaster;
		programTag.options = this.programTag.options;
		if (this.programTag.id === 0) {
			this.programTagService.save(programTag).subscribe((programTags) => {
				this.modalController.dismiss({ 'dismissed': true, 'programTags':programTags });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			programTag.id = this.programTag.id;
			this.programTagService.update(programTag.id, programTag).subscribe((programTags) => {
				this.modalController.dismiss({ 'dismissed': true, 'programTags':programTags });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
