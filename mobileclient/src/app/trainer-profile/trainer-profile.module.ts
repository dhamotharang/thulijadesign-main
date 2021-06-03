import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TrainerProfileRoutingModule } from './trainer-profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslatePipe } from '../shared/pipes/translate.pipe';

import { CUSTOM_DATE_FORMATS } from '../shared/services/builtin/format-datepicker';

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
		TrainerProfileMenuComponent
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
		TrainerProfileRoutingModule
	],
	entryComponents: [
		TrainerModifyComponent,
		TrainerDetailModifyComponent,
		TrainerAddressModifyComponent,
		TrainerFamilyModifyComponent,
		TrainerEducationDetailModifyComponent,
		TrainerOccupationModifyComponent
	]
})
export class TrainerProfileModule { }