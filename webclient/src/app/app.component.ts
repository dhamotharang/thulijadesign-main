import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './shared/models/core/user';
import { LogInService } from './shared/services/builtin/log-in.service';
import { TranslateService } from './shared/services/builtin/translate.service';
import { UserService } from './shared/services/core/user.service';
import { GroupMenuService } from './shared/services/core/group-menu.service';
import { GroupMenu } from './shared/models/core/group-menu';
import { GroupService } from './shared/services/core/group.service';
import { Group } from './shared/models/core/group';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	public currentUser:User;
	public profileLink:string;
	public groupMenus:string[];
	
	constructor(private logInService:LogInService, private router:Router,
		private translate:TranslateService, private userService:UserService,
		private groupService:GroupService,
		private groupMenuService:GroupMenuService) {
			this.currentUser = null;
			this.profileLink = '#';
			this.groupMenus = [];
	}
	
	ngOnInit() {
		this.userService.count().subscribe((count:number) => {
			if (count === 0) this.router.navigate(["/setup"]);
		})
		this.logInService.loggedInUser.subscribe((user:User) => {
			if (user !== null) {
				this.currentUser = user;
				if (user.profile !== null) {
					this.profileLink = "/" + user.profile.toLowerCase() + "profile";
				} else {
					this.profileLink = "/userprofile";
				}
			} else {
				this.currentUser = null;
				this.groupMenus = [];
				this.router.navigate(["/login"]);
			}
		})
	}

	public logout():void {
		this.logInService.logout();
		this.router.navigate(["/login"]);
	}

	public toggle() {
	}

	public setLang(lang: string) {
		this.translate.use(lang);
	}

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
