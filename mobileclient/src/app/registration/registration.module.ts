import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslatePipe } from '../shared/pipes/translate.pipe';

import { CUSTOM_DATE_FORMATS } from '../shared/services/builtin/format-datepicker';

import { RegistrationMainComponent } from './components/registration-main/registration-main.component';
import { ScholarRegistrationComponent } from './components/scholar-registration/scholar-registration.component';
import { ScholarRegistrationModifyComponent } from './components/scholar-registration-modify/scholar-registration-modify.component';
import { ScholarRegistrationPublicComponent } from './components/scholar-registration-public/scholar-registration-public.component';

@NgModule({
	declarations: [
		RegistrationMainComponent,
		ScholarRegistrationComponent,
		ScholarRegistrationModifyComponent,
		ScholarRegistrationPublicComponent,
	],
	providers: [
		TranslatePipe
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		EditorModule,
		SharedModule,
		RegistrationRoutingModule
	]
})
export class RegistrationModule { }