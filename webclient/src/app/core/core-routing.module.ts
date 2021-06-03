import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchComponent } from './components/branch/branch.component';
import { DepartmentComponent } from './components/department/department.component';
import { GroupComponent } from './components/group/group.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationTypeComponent } from './components/organization-type/organization-type.component';
import { StatusComponent } from './components/status/status.component';
import { UserComponent } from './components/user/user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserGroupComponent } from './components/user-group/user-group.component';

import { AdministratorGuardService } from '../shared/services/builtin/administrator-guard.service';

const routes: Routes = [
	{ path: 'branches', component: BranchComponent },
	{ path: 'departments', component: DepartmentComponent },
	{ path: 'groups', component: GroupComponent },
	{ path: 'organizations', component: OrganizationComponent },
	{ path: 'organizationtypes', component: OrganizationTypeComponent },
	{ path: 'statuses', component: StatusComponent },
	{ path: 'users', component: UserComponent },
	{ path: 'userprofile', component: UserProfileComponent },
	{ path: 'usergroups', component: UserGroupComponent },
	{ path: '', redirectTo: 'branches', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class CoreRoutingModule {}