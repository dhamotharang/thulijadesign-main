import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import { GeneralRoutingModule } from './general-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslatePipe } from '../shared/pipes/translate.pipe';

import { CUSTOM_DATE_FORMATS } from '../shared/services/builtin/format-datepicker';

import { AddressTypeComponent } from './components/address-type/address-type.component';
import { AddressTypeModifyComponent } from './components/address-type-modify/address-type-modify.component';
import { CitizenComponent } from './components/citizen/citizen.component';
import { CitizenModifyComponent } from './components/citizen-modify/citizen-modify.component';
import { CountryComponent } from './components/country/country.component';
import { CountryModifyComponent } from './components/country-modify/country-modify.component';
import { FieldStudyComponent } from './components/field-study/field-study.component';
import { FieldStudyModifyComponent } from './components/field-study-modify/field-study-modify.component';
import { GenderComponent } from './components/gender/gender.component';
import { GenderModifyComponent } from './components/gender-modify/gender-modify.component';
import { MaritalStatusComponent } from './components/marital-status/marital-status.component';
import { MaritalStatusModifyComponent } from './components/marital-status-modify/marital-status-modify.component';
import { OccupationTypeComponent } from './components/occupation-type/occupation-type.component';
import { OccupationTypeModifyComponent } from './components/occupation-type-modify/occupation-type-modify.component';
import { PositionLevelComponent } from './components/position-level/position-level.component';
import { PositionLevelModifyComponent } from './components/position-level-modify/position-level-modify.component';
import { QualificationComponent } from './components/qualification/qualification.component';
import { QualificationModifyComponent } from './components/qualification-modify/qualification-modify.component';
import { RaceComponent } from './components/race/race.component';
import { RaceModifyComponent } from './components/race-modify/race-modify.component';
import { RelationTypeComponent } from './components/relation-type/relation-type.component';
import { RelationTypeModifyComponent } from './components/relation-type-modify/relation-type-modify.component';
import { ReligionComponent } from './components/religion/religion.component';
import { ReligionModifyComponent } from './components/religion-modify/religion-modify.component';
import { SalaryRangeComponent } from './components/salary-range/salary-range.component';
import { SalaryRangeModifyComponent } from './components/salary-range-modify/salary-range-modify.component';
import { SalutationComponent } from './components/salutation/salutation.component';
import { SalutationModifyComponent } from './components/salutation-modify/salutation-modify.component';
import { StateComponent } from './components/state/state.component';
import { StateModifyComponent } from './components/state-modify/state-modify.component';

@NgModule({
	declarations: [
		AddressTypeComponent,
		AddressTypeModifyComponent,
		CitizenComponent,
		CitizenModifyComponent,
		CountryComponent,
		CountryModifyComponent,
		FieldStudyComponent,
		FieldStudyModifyComponent,
		GenderComponent,
		GenderModifyComponent,
		MaritalStatusComponent,
		MaritalStatusModifyComponent,
		OccupationTypeComponent,
		OccupationTypeModifyComponent,
		PositionLevelComponent,
		PositionLevelModifyComponent,
		QualificationComponent,
		QualificationModifyComponent,
		RaceComponent,
		RaceModifyComponent,
		RelationTypeComponent,
		RelationTypeModifyComponent,
		ReligionComponent,
		ReligionModifyComponent,
		SalaryRangeComponent,
		SalaryRangeModifyComponent,
		SalutationComponent,
		SalutationModifyComponent,
		StateComponent,
		StateModifyComponent
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
		GeneralRoutingModule
	]
})
export class GeneralModule { }