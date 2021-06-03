import { Component, OnInit } from '@angular/core';
import { User } from '../../models/core/user';
import { LogInService } from '../../services/builtin/log-in.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckPasswordStrength } from '../../services/builtin/customvalidators';
import { ComparePassword } from '../../services/builtin/customvalidators';
import { UserService } from '../../services/core/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

	changePasswordForm:FormGroup;
	user:User;
	oldPasswordHide:boolean;
	newPasswordHide:boolean;
	confirmPasswordHide:boolean;
	message:string;
	
	constructor(private logInService:LogInService,
			private userService:UserService,
			private router: Router) {
		this.user = null;
		this.oldPasswordHide = true;
		this.newPasswordHide = true;
		this.confirmPasswordHide = true;
	}
	
	ngOnInit() {
		this.logInService.loggedInUser.subscribe((user:User) => {
			if (user !== null) {
				this.user = user;
				this.changePasswordForm = this.createChangePasswordForm();
			}
		})
	}
	
	createChangePasswordForm():FormGroup {
		let changePasswordForm = new FormGroup({
			oldPassword: new FormControl('', [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(120),
				CheckPasswordStrength
			]),
			newPassword: new FormControl('', [
				Validators.required, 
				Validators.minLength(5),
				Validators.maxLength(120),
				CheckPasswordStrength
			]),
			confirmPassword: new FormControl('', [
				Validators.required, 
				Validators.minLength(5),
				Validators.maxLength(120),
				CheckPasswordStrength
			]),
		});
		changePasswordForm.setValidators(ComparePassword("newPassword", "confirmPassword"));
		return changePasswordForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.changePasswordForm.controls[controlName].hasError(errorName);
	}
	
	public doChangePassword() {
		this.userService.changePassword(this.user.id, this.changePasswordForm.get("oldPassword").value,
				this.changePasswordForm.get("newPassword").value,
				this.changePasswordForm.get("confirmPassword").value).subscribe((response:any) => {
			this.message = response.message;
		})
	}
	
}