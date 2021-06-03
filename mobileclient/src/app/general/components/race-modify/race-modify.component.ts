import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';

@Component({
	selector: 'app-race-modify',
	templateUrl: './race-modify.component.html',
	styleUrls: ['./race-modify.component.scss']
})
export class RaceModifyComponent implements OnInit {

	public raceForm:FormGroup;
	public race:Race;
	public errorMessage:string;

	constructor(private raceService:RaceService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.race = this.navParams.get('race');
	}

	ngOnInit() {
		if (this.race.id === 0) {
			this.raceForm = this.createRaceForm();
		} else {
			this.raceForm = this.editRaceForm();
		}
	}

	createRaceForm():FormGroup {
		let raceForm = new FormGroup({
			sequence: new FormControl(this.race.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(20),
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
		return raceForm;
	}

	editRaceForm():FormGroup {
		let raceForm = new FormGroup({
			sequence: new FormControl(this.race.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(20)
			]), 
			code: new FormControl(this.race.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.race.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.race.byDefault)))
		})
		return raceForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.raceForm.controls[controlName].hasError(errorName);
	}

	public save(race:Race) {
		if (this.race.id === 0) {
			this.raceService.save(race).subscribe((races) => {
				this.modalController.dismiss({ 'dismissed': true, 'races':races });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			race.id = this.race.id;
			this.raceService.update(race.id, race).subscribe((races) => {
				this.modalController.dismiss({ 'dismissed': true, 'races':races });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
