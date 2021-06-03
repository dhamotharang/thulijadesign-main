import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { TrainerProfileRoutingModule } from './trainer-profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CUSTOM_DATE_FORMATS } from '../shared/services/builtin/format-datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { TrainerComponent } from './components/trainer/trainer.component';
import { TrainerModifyComponent } from './components/trainer-modify/trainer-modify.component';
import { TrainerDetailComponent } from './components/trainer-detail/trainer-detail.component';
import { TrainerDetailModifyComponent } from './components/trainer-detail-modify/trainer-detail-modify.component';
import { TrainerAddressComponent } from './components/trainer-address/trainer-address.component';
import { TrainerAddressModifyComponent } from './components/trainer-address-modify/trainer-address-modify.component';
import { TrainerFamilyComponent } from './components/trainer-family/trainer-family.component';
import { TrainerFamilyModifyComponent } from './components/trainer-family-modify/trainer-family-modify.component';
import { TrainerEducationDetailComponent } from './components/trainer-education-detail/trainer-education-detail.component';
import { TrainerEducationDetailModifyComponent } from './components/trainer-education-detail-modify/trainer-education-detail-modify.component';
import { TrainerOccupationComponent } from './components/trainer-occupation/trainer-occupation.component';
import { TrainerOccupationModifyComponent } from './components/trainer-occupation-modify/trainer-occupation-modify.component';
import { TrainerProfileMenuComponent } from './components/trainer-profile-menu/trainer-profile-menu.component';
import { SystemDeleteConfirmationComponent } from './components/system-delete-confirmation/system-delete-confirmation.component';

@NgModule({
	declarations: [
		TrainerComponent,
		TrainerModifyComponent,
		TrainerDetailComponent,
		TrainerDetailModifyComponent,
		TrainerAddressComponent,
		TrainerAddressModifyComponent,
		TrainerFamilyComponent,
		TrainerFamilyModifyComponent,
		TrainerEducationDetailComponent,
		TrainerEducationDetailModifyComponent,
		TrainerOccupationComponent,
		TrainerOccupationModifyComponent,
		TrainerProfileMenuComponent,
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
		TrainerProfileRoutingModule
	],
	entryComponents: [
		TrainerModifyComponent,
		TrainerDetailModifyComponent,
		TrainerAddressModifyComponent,
		TrainerFamilyModifyComponent,
		TrainerEducationDetailModifyComponent,
		TrainerOccupationModifyComponent,
		SystemDeleteConfirmationComponent
	]
})
export class TrainerProfileModule { }