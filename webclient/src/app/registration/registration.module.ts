import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CUSTOM_DATE_FORMATS } from '../shared/services/builtin/format-datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { RegistrationMainComponent } from './components/registration-main/registration-main.component';
import { ScholarRegistrationComponent } from './components/scholar-registration/scholar-registration.component';
import { ScholarRegistrationModifyComponent } from './components/scholar-registration-modify/scholar-registration-modify.component';
import { ScholarRegistrationPublicComponent } from './components/scholar-registration-public/scholar-registration-public.component';
import { ScholarRegistrationEmailVerificationComponent } from './components/scholar-registration-email-verification/scholar-registration-email-verification.component';
import { SystemDeleteConfirmationComponent } from './components/system-delete-confirmation/system-delete-confirmation.component';

@NgModule({
	declarations: [
		RegistrationMainComponent,
		ScholarRegistrationComponent,
		ScholarRegistrationModifyComponent,
		ScholarRegistrationPublicComponent,
		ScholarRegistrationEmailVerificationComponent,
		SystemDeleteConfirmationComponent
	],
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		SharedModule,
		FlexLayoutModule,
		RegistrationRoutingModule
	],
	entryComponents: [
		ScholarRegistrationModifyComponent,
		SystemDeleteConfirmationComponent
	]
})
export class RegistrationModule { }