import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../../../shared/models/core/user';
import { UserService } from '../../../shared/services/core/user.service';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-user',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

	public user:User;
	private userSub:Subscription;
	private userDetailSub:Subscription;

	constructor(private userService:UserService,
		private logInService:LogInService) {
	}

	ngOnInit() {
		this.userSub = this.logInService.loggedInUser.subscribe((user:User) => {
			if (user !== null) {
				this.user = user;
				this.list();
			} 
		})
	}

	ngOnDestroy() {
		if (this.userSub) {
			this.userSub.unsubscribe();
		}
		if (this.userDetailSub) {
			this.userDetailSub.unsubscribe();
		}
	}

	list() {
		this.userDetailSub = this.userService.findById(this.user.id)
				.subscribe((user) => {
			this.user = user;
		})
	}

}
