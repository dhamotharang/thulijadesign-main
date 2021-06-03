import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MasterDetailRoutingModule } from './master-detail-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslatePipe } from '../shared/pipes/translate.pipe';

import { CUSTOM_DATE_FORMATS } from '../shared/services/builtin/format-datepicker';

import { TrainerManagerComponent } from './components/trainer-manager/trainer-manager.component';
import { TrainerManagerModifyComponent } from './components/trainer-manager-modify/trainer-manager-modify.component';
import { TrainerManagerMenuComponent } from './components/trainer-manager-menu/trainer-manager-menu.component';
import { TrainerDetailManagerComponent } from './components/trainer-detail-manager/trainer-detail-manager.component';
import { TrainerDetailManagerModifyComponent } from './components/trainer-detail-manager-modify/trainer-detail-manager-modify.component';
import { TrainerAddressManagerComponent } from './components/trainer-address-manager/trainer-address-manager.component';
import { TrainerAddressManagerModifyComponent } from './components/trainer-address-manager-modify/trainer-address-manager-modify.component';
import { TrainerFamilyManagerComponent } from './components/trainer-family-manager/trainer-family-manager.component';
import { TrainerFamilyManagerModifyComponent } from './components/trainer-family-manager-modify/trainer-family-manager-modify.component';
import { TrainerEducationDetailManagerComponent } from './components/trainer-education-detail-manager/trainer-education-detail-manager.component';
import { TrainerEducationDetailManagerModifyComponent } from './components/trainer-education-detail-manager-modify/trainer-education-detail-manager-modify.component';
import { TrainerOccupationManagerComponent } from './components/trainer-occupation-manager/trainer-occupation-manager.component';
import { TrainerOccupationManagerModifyComponent } from './components/trainer-occupation-manager-modify/trainer-occupation-manager-modify.component';

@NgModule({
	declarations: [
		TrainerManagerComponent,
		TrainerManagerModifyComponent,
		TrainerManagerMenuComponent,
		TrainerDetailManagerComponent,
		TrainerDetailManagerModifyComponent,
		TrainerAddressManagerComponent,
		TrainerAddressManagerModifyComponent,
		TrainerFamilyManagerComponent,
		TrainerFamilyManagerModifyComponent,
		TrainerEducationDetailManagerComponent,
		TrainerEducationDetailManagerModifyComponent,
		TrainerOccupationManagerComponent,
		TrainerOccupationManagerModifyComponent
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
		MasterDetailRoutingModule
	],
	entryComponents: [
		TrainerManagerModifyComponent,
		TrainerDetailManagerModifyComponent,
		TrainerAddressManagerModifyComponent,
		TrainerFamilyManagerModifyComponent,
		TrainerEducationDetailManagerModifyComponent,
		TrainerOccupationManagerModifyComponent
	]
})
export class MasterDetailModule { }