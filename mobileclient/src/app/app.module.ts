import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { JwtInterceptorService } from './shared/services/builtin/jwt-interceptor.service';
import { TranslateService } from './shared/services/builtin/translate.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreMainComponent } from './menu/core-main/core-main.component';
import { GeneralMainComponent } from './menu/general-main/general-main.component';
import { ProgramMainComponent } from './menu/program-main/program-main.component';
import { RegistrationManagerComponent } from './menu/registration-manager/registration-manager.component';

export function setupTranslateFactory(service: TranslateService): Function {
	return () => service.use('en');
}

@NgModule({
	declarations: [
		AppComponent,
		CoreMainComponent,
		GeneralMainComponent,
		ProgramMainComponent,
		RegistrationManagerComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		IonicModule.forRoot(),
		SharedModule.forRoot(),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		})
	],
	providers: [
		InAppBrowser,
		SplashScreen,
		StatusBar,
		TranslateService,
		{
			provide: APP_INITIALIZER,
			useFactory: setupTranslateFactory,
			deps: [TranslateService],
			multi: true
		},
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }