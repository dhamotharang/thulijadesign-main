import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainerComponent } from './components/trainer/trainer.component';
import { TrainerDetailComponent } from './components/trainer-detail/trainer-detail.component';
import { TrainerAddressComponent } from './components/trainer-address/trainer-address.component';
import { TrainerFamilyComponent } from './components/trainer-family/trainer-family.component';
import { TrainerEducationDetailComponent } from './components/trainer-education-detail/trainer-education-detail.component';
import { TrainerOccupationComponent } from './components/trainer-occupation/trainer-occupation.component';
import { TrainerProfileMenuComponent } from './components/trainer-profile-menu/trainer-profile-menu.component';

const routes: Routes = [
	{ path: 'trainerprofilemenu', component: TrainerProfileMenuComponent, children: [
		{ path: 'trainers', component: TrainerComponent },
		{ path: 'trainerdetails', component: TrainerDetailComponent },
		{ path: 'traineraddresses', component: TrainerAddressComponent },
		{ path: 'trainerfamilies', component: TrainerFamilyComponent },
		{ path: 'trainereducationdetails', component: TrainerEducationDetailComponent },
		{ path: 'traineroccupations', component: TrainerOccupationComponent },
		{ path: '', redirectTo: 'trainers', pathMatch: 'full' }
	]},
	{ path: '', redirectTo: 'trainerprofilemenu', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class TrainerProfileRoutingModule {}