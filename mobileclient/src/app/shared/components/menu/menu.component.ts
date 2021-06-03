import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/core/user';
import { GroupMenu } from '../../models/core/group-menu';
import { LogInService } from '../../services/builtin/log-in.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

	public currentUser:User;
	public profileLink:string;
	public setupMenu:boolean;
	public organizationSetupMenu:boolean;
	public scholarBusinessSetupMenu:boolean

	constructor(private logInService:LogInService,
			private router:Router) {
		this.currentUser = null;
		this.profileLink = '#';
		this.setupMenu = false;
		this.organizationSetupMenu = false;
		this.scholarBusinessSetupMenu = false;
	}

	ngOnInit() {
		this.logInService.loggedInUser.subscribe((user:User) => {
			if (user !== null) {
				this.currentUser = user;
				if (user.profile !== null) {
					this.profileLink = "/" + user.profile.toLocaleLowerCase() + "profile";
				} else {
					this.profileLink = "/userprofile";
				}
			} else {
				this.currentUser = null;
			}
		})
	}

	public logout():void {
		this.logInService.logout();
		this.router.navigate(["/login"]);
	}

    openFacebookProfile() { }

    openInstagramProfile() { }

    openTwitterProfile() { }

	openWebsite() { }

	public isInGroup(name: string):boolean {
		if (this.currentUser.groupMenus) {
			let result:boolean = false;
			this.currentUser.groupMenus.forEach((groupMenu:GroupMenu) => {
				if (groupMenu.name.toLowerCase() + "menu" === name.toLowerCase()) result = true;
			})
			return result;
		} else {
			return false;
		}
	}

}