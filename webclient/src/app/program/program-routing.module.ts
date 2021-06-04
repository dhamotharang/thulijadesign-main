import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatchContentComponent } from './components/batch-content/batch-content.component';
import { BatchPrerequisiteComponent } from './components/batch-prerequisite/batch-prerequisite.component';
import { ProgramCategoryComponent } from './components/program-category/program-category.component';
import { ProgramTypeComponent } from './components/program-type/program-type.component';
import { TrainingDeliveryComponent } from './components/training-delivery/training-delivery.component';
import { TrainingModeComponent } from './components/training-mode/training-mode.component';

import { AdministratorGuardService } from '../shared/services/builtin/administrator-guard.service';

const routes: Routes = [
	{ path: 'batchcontents', component: BatchContentComponent },
	{ path: 'batchprerequisites', component: BatchPrerequisiteComponent },
	{ path: 'programcategories', component: ProgramCategoryComponent },
	{ path: 'programtypes', component: ProgramTypeComponent },
	{ path: 'trainingdeliveries', component: TrainingDeliveryComponent },
	{ path: 'trainingmodes', component: TrainingModeComponent },
	{ path: '', redirectTo: 'batchcontents', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class ProgramRoutingModule {}