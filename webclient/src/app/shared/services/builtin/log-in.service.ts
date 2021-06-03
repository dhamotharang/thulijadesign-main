import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

import { UserService } from '../core/user.service';
import { User } from '../../models/core/user';

@Injectable({
	providedIn: 'root'
})
export class LogInService {
	
	private loggedInSource = new BehaviorSubject(null);
	loggedInUser = this.loggedInSource.asObservable();
	private userService:UserService;

	constructor(userService:UserService) {
		this.userService = userService;
	}

	login(emailaddress:string, password:string) {
		let hashPassword:string = Md5.hashStr(password) + '';
		this.userService.findByEmailAddressAndPassword(emailaddress, hashPassword).subscribe((data:any) => {
			if (data) {
				let accessToken = data.access_token;
				if (accessToken) {
					let user:User = new User(data.user.id, data.user.organization, data.user.branch, 
						data.user.department, data.user.first_name, data.user.last_name, 
						data.user.email_address, data.user.password, data.user.num_logins, 
						data.user.last_login_time, data.user.status, data.user.profile);
					user.groups = data.groups;
					user.groupMenus = data.groupMenus;
					this.loggedInSource.next(user);
					localStorage.setItem('user', JSON.stringify(user));
				} else {
					this.loggedInSource.next(null);
					localStorage.removeItem('user');
				}
			} else {
				this.loggedInSource.next(null);
				localStorage.removeItem('user');
			}
		})
	}

	logout() {
		this.loggedInSource.next(null);
		localStorage.removeItem('user');
	}

}
