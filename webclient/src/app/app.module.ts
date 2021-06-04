import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { MaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

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
		MaterialModule,
		ChartsModule,
		BrowserAnimationsModule,
		SharedModule.forRoot()
	],
	providers: [
		TranslateService,
		{
			provide: APP_INITIALIZER,
			useFactory: setupTranslateFactory,
			deps: [TranslateService],
			multi: true
		},
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }