import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdministratorGuardService } from '../shared/services/builtin/administrator-guard.service';

const routes: Routes = [
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class TrainerRoutingModule {}