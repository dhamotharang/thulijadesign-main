import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ScholarProfileRoutingModule } from './scholar-profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslatePipe } from '../shared/pipes/translate.pipe';

import { CUSTOM_DATE_FORMATS } from '../shared/services/builtin/format-datepicker';

import { ScholarComponent } from './components/scholar/scholar.component';
import { ScholarModifyComponent } from './components/scholar-modify/scholar-modify.component';
import { ScholarDetailComponent } from './components/scholar-detail/scholar-detail.component';
import { ScholarDetailModifyComponent } from './components/scholar-detail-modify/scholar-detail-modify.component';
import { ScholarAddressComponent } from './components/scholar-address/scholar-address.component';
import { ScholarAddressModifyComponent } from './components/scholar-address-modify/scholar-address-modify.component';
import { ScholarFamilyComponent } from './components/scholar-family/scholar-family.component';
import { ScholarFamilyModifyComponent } from './components/scholar-family-modify/scholar-family-modify.component';
import { ScholarEducationDetailComponent } from './components/scholar-education-detail/scholar-education-detail.component';
import { ScholarEducationDetailModifyComponent } from './components/scholar-education-detail-modify/scholar-education-detail-modify.component';
import { ScholarOccupationComponent } from './components/scholar-occupation/scholar-occupation.component';
import { ScholarOccupationModifyComponent } from './components/scholar-occupation-modify/scholar-occupation-modify.component';
import { ScholarProfileMenuComponent } from './components/scholar-profile-menu/scholar-profile-menu.component';

@NgModule({
	declarations: [
		ScholarComponent,
		ScholarModifyComponent,
		ScholarDetailComponent,
		ScholarDetailModifyComponent,
		ScholarAddressComponent,
		ScholarAddressModifyComponent,
		ScholarFamilyComponent,
		ScholarFamilyModifyComponent,
		ScholarEducationDetailComponent,
		ScholarEducationDetailModifyComponent,
		ScholarOccupationComponent,
		ScholarOccupationModifyComponent,
		ScholarProfileMenuComponent
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
		ScholarProfileRoutingModule
	],
	entryComponents: [
		ScholarModifyComponent,
		ScholarDetailModifyComponent,
		ScholarAddressModifyComponent,
		ScholarFamilyModifyComponent,
		ScholarEducationDetailModifyComponent,
		ScholarOccupationModifyComponent
	]
})
export class ScholarProfileModule { }