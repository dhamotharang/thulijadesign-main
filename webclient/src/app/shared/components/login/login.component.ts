import { Component, OnInit } from '@angular/core';
import { User } from '../../models/core/user';
import { LogInService } from '../../services/builtin/log-in.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm:FormGroup;
	user:User;
	hide:boolean
	message:string;
	loginClicked:boolean;
	isForgotPassword:boolean;
	
	constructor(private logInService:LogInService,
			private router: Router) {
		this.hide = true;
		this.loginClicked = false;
	}
	
	ngOnInit() {
		this.loginForm = this.createLoginForm();
		this.logInService.loggedInUser.subscribe((user:User) => {
			if (user !== null) {
				this.user = user;
				this.loginClicked = false;
			} else {
				this.user = null;
				if (this.loginClicked) {
					this.message = "LOGIN-ERROR-MESSAGE-ONE";
					this.loginClicked = false;
				} else {
					this.message = "";
				}
			}
		})
	}
	
	createLoginForm():FormGroup {
		let loginForm = new FormGroup({
			username: new FormControl('', [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(120),
				Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
			]),
			password: new FormControl('', [
				Validators.required, 
				Validators.minLength(5),
				Validators.maxLength(120),
			]),
		});
		return loginForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.loginForm.controls[controlName].hasError(errorName);
	}
	
	public doLogin() {
		if (this.loginForm.valid) {
			this.logInService.login(
				this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
			this.loginClicked = true;
		} else {
			this.message = "LOGIN-ERROR-MESSAGE-TWO";
		}
	}
	
	public doForgotPassword() {
		this.router.navigate(['/forgotpassword']);
	}

	public doRegistration() {
		this.router.navigate(['/registration'])
	}

}