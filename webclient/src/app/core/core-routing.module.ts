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
	{ path: 'branches', component: BranchComponent, canActivate: [AdministratorGuardService] },
	{ path: 'departments', component: DepartmentComponent, canActivate: [AdministratorGuardService] },
	{ path: 'groups', component: GroupComponent, canActivate: [AdministratorGuardService] },
	{ path: 'organizations', component: OrganizationComponent, canActivate: [AdministratorGuardService] },
	{ path: 'organizationtypes', component: OrganizationTypeComponent, canActivate: [AdministratorGuardService] },
	{ path: 'statuses', component: StatusComponent, canActivate: [AdministratorGuardService] },
	{ path: 'users', component: UserComponent, canActivate: [AdministratorGuardService] },
	{ path: 'userprofile', component: UserProfileComponent },
	{ path: 'usergroups', component: UserGroupComponent, canActivate: [AdministratorGuardService] },
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