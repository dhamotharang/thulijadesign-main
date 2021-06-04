import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScholarComponent } from './components/scholar/scholar.component';
import { ScholarDetailComponent } from './components/scholar-detail/scholar-detail.component';
import { ScholarAddressComponent } from './components/scholar-address/scholar-address.component';
import { ScholarFamilyComponent } from './components/scholar-family/scholar-family.component';
import { ScholarEducationDetailComponent } from './components/scholar-education-detail/scholar-education-detail.component';
import { ScholarOccupationComponent } from './components/scholar-occupation/scholar-occupation.component';
import { ScholarProfileMenuComponent } from './components/scholar-profile-menu/scholar-profile-menu.component';

const routes: Routes = [
	{ path: 'scholarprofilemenu', component: ScholarProfileMenuComponent, children: [
		{ path: 'scholars', component: ScholarComponent },
		{ path: 'scholardetails', component: ScholarDetailComponent },
		{ path: 'scholaraddresses', component: ScholarAddressComponent },
		{ path: 'scholarfamilies', component: ScholarFamilyComponent },
		{ path: 'scholareducationdetails', component: ScholarEducationDetailComponent },
		{ path: 'scholaroccupations', component: ScholarOccupationComponent },
		{ path: '', redirectTo: 'scholars', pathMatch: 'full' }
	]},
	{ path: '', redirectTo: 'scholarprofilemenu', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class ScholarProfileRoutingModule {}