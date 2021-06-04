import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationMainComponent } from './components/registration-main/registration-main.component';
import { ScholarRegistrationComponent } from './components/scholar-registration/scholar-registration.component';
import { ScholarRegistrationPublicComponent } from './components/scholar-registration-public/scholar-registration-public.component';

import { AdministratorGuardService } from '../shared/services/builtin/administrator-guard.service';

const routes: Routes = [
	{ path: 'scholarregistrations', component: ScholarRegistrationComponent, canActivate: [AdministratorGuardService] },
	{ path: 'public', component: RegistrationMainComponent, children: [
		{ path: 'scholarregistrations', component: ScholarRegistrationPublicComponent },
		{ path: '', redirectTo: 'scholarregistrations', pathMatch: 'full' }
	]},
	{ path: '', redirectTo: 'public', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class RegistrationRoutingModule {}