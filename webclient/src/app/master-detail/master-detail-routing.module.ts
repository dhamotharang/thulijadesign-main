import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainerManagerComponent } from './components/trainer-manager/trainer-manager.component';
import { TrainerManagerMenuComponent } from './components/trainer-manager-menu/trainer-manager-menu.component';
import { TrainerDetailManagerComponent } from './components/trainer-detail-manager/trainer-detail-manager.component';
import { TrainerAddressManagerComponent } from './components/trainer-address-manager/trainer-address-manager.component';
import { TrainerFamilyManagerComponent } from './components/trainer-family-manager/trainer-family-manager.component';
import { TrainerEducationDetailManagerComponent } from './components/trainer-education-detail-manager/trainer-education-detail-manager.component';
import { TrainerOccupationManagerComponent } from './components/trainer-occupation-manager/trainer-occupation-manager.component';

const routes: Routes = [
	{ path: 'trainermanagers', component: TrainerManagerComponent, pathMatch: 'full' },
	{ path: 'trainermanagers/:id', component: TrainerManagerMenuComponent, children: [
		{ path: 'trainerdetailmanagers', component: TrainerDetailManagerComponent, pathMatch: 'full' },
		{ path: 'traineraddressmanagers', component: TrainerAddressManagerComponent, pathMatch: 'full' },
		{ path: 'trainerfamilymanagers', component: TrainerFamilyManagerComponent, pathMatch: 'full' },
		{ path: 'trainereducationdetailmanagers', component: TrainerEducationDetailManagerComponent, pathMatch: 'full' },
		{ path: 'traineroccupationmanagers', component: TrainerOccupationManagerComponent, pathMatch: 'full' },
		{ path: '', redirectTo: 'trainerdetailmanagers', pathMatch: 'full' }
	]},
	{ path: '', redirectTo: 'trainermanagers', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class MasterDetailRoutingModule { }