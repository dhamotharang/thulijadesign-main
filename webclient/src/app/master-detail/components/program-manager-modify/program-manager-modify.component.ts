import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';
import { ProgramMaster } from '../../../shared/models/program/program-master';
import { ProgramMasterService } from '../../../shared/services/program/program-master.service';
import { TrainingDelivery } from '../../../shared/models/program/training-delivery';
import { TrainingDeliveryService } from '../../../shared/services/program/training-delivery.service';
import { TrainingMode } from '../../../shared/models/program/training-mode';
import { TrainingModeService } from '../../../shared/services/program/training-mode.service';

@Component({
	selector: 'app-program-manager-modify',
	templateUrl: './program-manager-modify.component.html',
	styleUrls: ['./program-manager-modify.component.css']
})
export class ProgramManagerModifyComponent implements OnInit {

	public programForm:FormGroup;
	public programMasters:ProgramMaster[];
	public currentProgramMaster:ProgramMaster;
	public trainingDeliveries:TrainingDelivery[];
	public currentTrainingDelivery:TrainingDelivery;
	public trainingModes:TrainingMode[];
	public currentTrainingMode:TrainingMode;
	public errorMessage:string;

	compareProgramMaster = (currentprogramMaster: ProgramMaster, programMaster: ProgramMaster) => currentprogramMaster.id == programMaster.id;
	
	compareTrainingDelivery = (currenttrainingDelivery: TrainingDelivery, trainingDelivery: TrainingDelivery) => currenttrainingDelivery.id == trainingDelivery.id;
	
	compareTrainingMode = (currenttrainingMode: TrainingMode, trainingMode: TrainingMode) => currenttrainingMode.id == trainingMode.id;
	
	constructor(private programService:ProgramService,
		private programMasterService:ProgramMasterService,
		private trainingDeliveryService:TrainingDeliveryService,
		private trainingModeService:TrainingModeService,
		private dialogRef: MatDialogRef<ProgramManagerModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public program:Program) {
			this.programMasterService.findAllByLookup().subscribe(programMasters => {
				this.programMasters = programMasters;
			})
			this.trainingDeliveryService.findAllByLookup().subscribe(trainingDeliveries => {
				this.trainingDeliveries = trainingDeliveries;
				if (this.program.id === 0) {
					this.trainingDeliveries.forEach((trainingDelivery) => {
						if (trainingDelivery.byDefault == true) this.programForm.controls['trainingDelivery'].setValue(trainingDelivery);
					}, (error) => {
						this.errorMessage = error.message;
					})
				}
			})
			this.trainingModeService.findAllByLookup().subscribe(trainingModes => {
				this.trainingModes = trainingModes;
				if (this.program.id === 0) {
					this.trainingModes.forEach((trainingMode) => {
						if (trainingMode.byDefault == true) this.programForm.controls['trainingMode'].setValue(trainingMode);
					}, (error) => {
						this.errorMessage = error.message;
					})
				}
			})
	}

	ngOnInit() {
		if (this.program.id === 0) {
			this.programForm = this.createProgramForm();
		} else {
			this.programForm = this.editProgramForm();
		}
	}

	createProgramForm():FormGroup {
		let programForm = new FormGroup({
			programMaster: new FormControl('', {
				validators: [
				]
			}),
			trainingDelivery: new FormControl('', {
				validators: [
				]
			}),
			trainingMode: new FormControl('', {
				validators: [
				]
			})
		})
		return programForm;
	}

	editProgramForm():FormGroup {
		this.currentProgramMaster = this.program.programMaster;
		this.currentTrainingDelivery = this.program.trainingDelivery;
		this.currentTrainingMode = this.program.trainingMode;
		let programForm = new FormGroup({
			programMaster: new FormControl(this.program.programMaster, [
			]), 
			trainingDelivery: new FormControl(this.program.trainingDelivery, [
			]), 
			trainingMode: new FormControl(this.program.trainingMode, [
			])
		})
		return programForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.programForm.controls[controlName].hasError(errorName);
	}

	private validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}
		});
	}

	public save(program:Program) {
		if (this.programForm.valid) {
			if (this.program.id === 0) {
				this.programService.save(program).subscribe((programs) => {
					this.dialogRef.close(programs);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				program.id = this.program.id;
				this.programService.update(program.id, program).subscribe((programs) => {
					this.dialogRef.close(programs);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.programForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
