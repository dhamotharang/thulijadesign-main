import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { PositionLevel } from '../../../shared/models/general/position-level';
import { PositionLevelService } from '../../../shared/services/general/position-level.service';

@Component({
	selector: 'app-position-level-modify',
	templateUrl: './position-level-modify.component.html',
	styleUrls: ['./position-level-modify.component.scss']
})
export class PositionLevelModifyComponent implements OnInit {

	public positionLevelForm:FormGroup;
	public positionLevel:PositionLevel;
	public errorMessage:string;

	constructor(private positionLevelService:PositionLevelService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.positionLevel = this.navParams.get('positionLevel');
	}

	ngOnInit() {
		if (this.positionLevel.id === 0) {
			this.positionLevelForm = this.createPositionLevelForm();
		} else {
			this.positionLevelForm = this.editPositionLevelForm();
		}
	}

	createPositionLevelForm():FormGroup {
		let positionLevelForm = new FormGroup({
			sequence: new FormControl(this.positionLevel.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(500),
					Validators.pattern("^[0-9]*$")
				]
			}),
			code: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(10)
				]
			}),
			name: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(60)
				]
			}),
			byDefault: new FormControl(0)
		})
		return positionLevelForm;
	}

	editPositionLevelForm():FormGroup {
		let positionLevelForm = new FormGroup({
			sequence: new FormControl(this.positionLevel.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(500)
			]), 
			code: new FormControl(this.positionLevel.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.positionLevel.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.positionLevel.byDefault)))
		})
		return positionLevelForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.positionLevelForm.controls[controlName].hasError(errorName);
	}

	public save(positionLevel:PositionLevel) {
		if (this.positionLevel.id === 0) {
			this.positionLevelService.save(positionLevel).subscribe((positionLevels) => {
				this.modalController.dismiss({ 'dismissed': true, 'positionLevels':positionLevels });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			positionLevel.id = this.positionLevel.id;
			this.positionLevelService.update(positionLevel.id, positionLevel).subscribe((positionLevels) => {
				this.modalController.dismiss({ 'dismissed': true, 'positionLevels':positionLevels });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
