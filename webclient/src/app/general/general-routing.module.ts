import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressTypeComponent } from './components/address-type/address-type.component';
import { CitizenComponent } from './components/citizen/citizen.component';
import { CountryComponent } from './components/country/country.component';
import { FieldStudyComponent } from './components/field-study/field-study.component';
import { GenderComponent } from './components/gender/gender.component';
import { MaritalStatusComponent } from './components/marital-status/marital-status.component';
import { OccupationTypeComponent } from './components/occupation-type/occupation-type.component';
import { PositionLevelComponent } from './components/position-level/position-level.component';
import { QualificationComponent } from './components/qualification/qualification.component';
import { RaceComponent } from './components/race/race.component';
import { RelationTypeComponent } from './components/relation-type/relation-type.component';
import { ReligionComponent } from './components/religion/religion.component';
import { SalaryRangeComponent } from './components/salary-range/salary-range.component';
import { SalutationComponent } from './components/salutation/salutation.component';
import { StateComponent } from './components/state/state.component';

import { AdministratorGuardService } from '../shared/services/builtin/administrator-guard.service';

const routes: Routes = [
	{ path: 'addresstypes', component: AddressTypeComponent },
	{ path: 'citizens', component: CitizenComponent },
	{ path: 'countries', component: CountryComponent },
	{ path: 'fieldstudies', component: FieldStudyComponent },
	{ path: 'genders', component: GenderComponent },
	{ path: 'maritalstatuses', component: MaritalStatusComponent },
	{ path: 'occupationtypes', component: OccupationTypeComponent },
	{ path: 'positionlevels', component: PositionLevelComponent },
	{ path: 'qualifications', component: QualificationComponent },
	{ path: 'races', component: RaceComponent },
	{ path: 'relationtypes', component: RelationTypeComponent },
	{ path: 'religions', component: ReligionComponent },
	{ path: 'salaryranges', component: SalaryRangeComponent },
	{ path: 'salutations', component: SalutationComponent },
	{ path: 'states', component: StateComponent },
	{ path: '', redirectTo: 'addresstypes', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class GeneralRoutingModule {}