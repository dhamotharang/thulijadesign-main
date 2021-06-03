import { Component, OnInit } from '@angular/core';
import { User } from '../../models/core/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

	forgotForm:FormGroup;
	message:string;

	constructor() { }
	
	ngOnInit() {
		this.forgotForm = this.createForgotForm();
	}

	createForgotForm():FormGroup {
		let forgotForm = new FormGroup({
			username: new FormControl('', [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(120),
				Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
			])
		});
		return forgotForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.forgotForm.controls[controlName].hasError(errorName);
	}

	public resetPassword() {
		if (this.forgotForm.valid) {
		} else {
			this.message = "FORGOT-PASSWORD-ERROR-MESSAGE";
		}
	}

}