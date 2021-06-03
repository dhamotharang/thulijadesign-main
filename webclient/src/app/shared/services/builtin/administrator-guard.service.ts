import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';

import { LogInService } from '../../../shared/services/builtin/log-in.service';
import { User } from '../../../shared/models/core/user';

@Injectable({
	providedIn: 'root'
})
export class AdministratorGuardService {

	constructor(private logInService:LogInService) {
	}  

	canActivate(): Observable<boolean> {
		return this.logInService.loggedInUser.pipe(map((user:User) => {
			if (user.emailAddress === "arock0406@gmail.com") return true;
			return false;
		}));
	}

}