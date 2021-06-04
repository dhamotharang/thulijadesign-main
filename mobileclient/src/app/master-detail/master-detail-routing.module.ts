import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupManagerComponent } from './components/group-manager/group-manager.component';
import { GroupManagerMenuComponent } from './components/group-manager-menu/group-manager-menu.component';
import { UserGroupManagerComponent } from './components/user-group-manager/user-group-manager.component';
import { ScholarManagerComponent } from './components/scholar-manager/scholar-manager.component';
import { ScholarManagerMenuComponent } from './components/scholar-manager-menu/scholar-manager-menu.component';
import { ScholarDetailManagerComponent } from './components/scholar-detail-manager/scholar-detail-manager.component';
import { ScholarAddressManagerComponent } from './components/scholar-address-manager/scholar-address-manager.component';
import { ScholarFamilyManagerComponent } from './components/scholar-family-manager/scholar-family-manager.component';
import { ScholarEducationDetailManagerComponent } from './components/scholar-education-detail-manager/scholar-education-detail-manager.component';
import { ScholarOccupationManagerComponent } from './components/scholar-occupation-manager/scholar-occupation-manager.component';
import { ProgramMasterManagerComponent } from './components/program-master-manager/program-master-manager.component';
import { ProgramMasterManagerMenuComponent } from './components/program-master-manager-menu/program-master-manager-menu.component';
import { ProgramTagManagerComponent } from './components/program-tag-manager/program-tag-manager.component';
import { ProgramManagerComponent } from './components/program-manager/program-manager.component';
import { ProgramManagerMenuComponent } from './components/program-manager-menu/program-manager-menu.component';
import { BatchManagerComponent } from './components/batch-manager/batch-manager.component';
import { BatchManagerMenuComponent } from './components/batch-manager-menu/batch-manager-menu.component';
import { BatchPrerequisiteManagerComponent } from './components/batch-prerequisite-manager/batch-prerequisite-manager.component';
import { BatchScholarManagerComponent } from './components/batch-scholar-manager/batch-scholar-manager.component';
import { ScholarBatchRegistrationManagerComponent } from './components/scholar-batch-registration-manager/scholar-batch-registration-manager.component';
import { BatchModuleManagerComponent } from './components/batch-module-manager/batch-module-manager.component';
import { BatchContentManagerComponent } from './components/batch-content-manager/batch-content-manager.component';

const routes: Routes = [
	{ path: 'groupmanagers', component: GroupManagerComponent, pathMatch: 'full' },
	{ path: 'groupmanagers/:id', children: [
		{ path: 'usergroupmanagers', component: UserGroupManagerComponent, pathMatch: 'full' },
		{ path: '', redirectTo: 'usergroupmanagers', pathMatch: 'full' }
	]},
	{ path: 'scholarmanagers', component: ScholarManagerComponent, pathMatch: 'full' },
	{ path: 'scholarmanagers/:id', component: ScholarManagerMenuComponent, children: [
		{ path: 'scholardetailmanagers', component: ScholarDetailManagerComponent, pathMatch: 'full' },
		{ path: 'scholaraddressmanagers', component: ScholarAddressManagerComponent, pathMatch: 'full' },
		{ path: 'scholarfamilymanagers', component: ScholarFamilyManagerComponent, pathMatch: 'full' },
		{ path: 'scholareducationdetailmanagers', component: ScholarEducationDetailManagerComponent, pathMatch: 'full' },
		{ path: 'scholaroccupationmanagers', component: ScholarOccupationManagerComponent, pathMatch: 'full' },
		{ path: '', redirectTo: 'scholardetailmanagers', pathMatch: 'full' }
	]},
	{ path: 'programmastermanagers', component: ProgramMasterManagerComponent, pathMatch: 'full' },
	{ path: 'programmastermanagers/:id', children: [
		{ path: 'programtagmanagers', component: ProgramTagManagerComponent, pathMatch: 'full' },
		{ path: '', redirectTo: 'programtagmanagers', pathMatch: 'full' }
	]},
	{ path: 'programmanagers', component: ProgramManagerComponent, pathMatch: 'full' },
	{ path: 'programmanagers/:id', children: [
		{ path: 'batchmanagers', component: BatchManagerComponent, pathMatch: 'full' },
		{ path: 'batchmanagers/:batchid', component: BatchManagerMenuComponent, children: [
			{ path: 'batchprerequisitemanagers', component: BatchPrerequisiteManagerComponent, pathMatch: 'full' },
			{ path: 'batchscholarmanagers', component: BatchScholarManagerComponent, pathMatch: 'full' },
			{ path: 'batchscholarmanagers/:batchscholarid', children: [
				{ path: 'scholarbatchregistrationmanagers', component: ScholarBatchRegistrationManagerComponent, pathMatch: 'full' },
				{ path: '', redirectTo: 'scholarbatchregistrationmanagers', pathMatch: 'full' }
			]},
			{ path: 'batchmodulemanagers', component: BatchModuleManagerComponent, pathMatch: 'full' },
			{ path: 'batchcontentmanagers', component: BatchContentManagerComponent, pathMatch: 'full' },
			{ path: '', redirectTo: 'batchprerequisitemanagers', pathMatch: 'full' }
		]},
		{ path: '', redirectTo: 'batchmanagers', pathMatch: 'full' }
	]},
	{ path: '', redirectTo: 'groupmanagers', pathMatch: 'full' }
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