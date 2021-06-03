import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { LogInService } from './shared/services/builtin/log-in.service';
import { TranslateService } from './shared/services/builtin/translate.service';
import { UserService } from './shared/services/core/user.service';
import { User } from './shared/models/core/user';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

	public currentUser:User;
	public profileLink:string;

	constructor(private router: Router,
		private logInService:LogInService, 
		private translate:TranslateService, 
		private userService:UserService,
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private swUpdate: SwUpdate,
		private toastCtrl: ToastController) {
			this.currentUser = null;
			this.profileLink = '#';
			this.initializeApp();
	}

	ngOnInit() {
		this.swUpdate.available.subscribe(async res => {
			const toast = await this.toastCtrl.create({
				message: 'Update available!',
				position: 'bottom',
				buttons: [{
					role: 'cancel',
					text: 'Reload'
				}]
			});
			await toast.present();
			toast
				.onDidDismiss()
				.then(() => this.swUpdate.activateUpdate())
				.then(() => window.location.reload());
		});
		this.userService.count().subscribe((count:number) => {
			if (count === 0) this.router.navigate(["/setup"]);
		});
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
				this.router.navigate(["/login"]);
			}
		});
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
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

}
