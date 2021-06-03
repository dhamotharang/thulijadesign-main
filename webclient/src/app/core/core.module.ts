import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CUSTOM_DATE_FORMATS } from '../shared/services/builtin/format-datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { BranchComponent } from './components/branch/branch.component';
import { BranchModifyComponent } from './components/branch-modify/branch-modify.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentModifyComponent } from './components/department-modify/department-modify.component';
import { GroupComponent } from './components/group/group.component';
import { GroupModifyComponent } from './components/group-modify/group-modify.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationModifyComponent } from './components/organization-modify/organization-modify.component';
import { OrganizationTypeComponent } from './components/organization-type/organization-type.component';
import { OrganizationTypeModifyComponent } from './components/organization-type-modify/organization-type-modify.component';
import { StatusComponent } from './components/status/status.component';
import { StatusModifyComponent } from './components/status-modify/status-modify.component';
import { UserComponent } from './components/user/user.component';
import { UserModifyComponent } from './components/user-modify/user-modify.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserGroupComponent } from './components/user-group/user-group.component';
import { UserGroupModifyComponent } from './components/user-group-modify/user-group-modify.component';
import { SystemDeleteConfirmationComponent } from './components/system-delete-confirmation/system-delete-confirmation.component';

@NgModule({
	declarations: [
		BranchComponent,
		BranchModifyComponent,
		DepartmentComponent,
		DepartmentModifyComponent,
		GroupComponent,
		GroupModifyComponent,
		OrganizationComponent,
		OrganizationModifyComponent,
		OrganizationTypeComponent,
		OrganizationTypeModifyComponent,
		StatusComponent,
		StatusModifyComponent,
		UserComponent,
		UserModifyComponent,
		UserProfileComponent,
		UserGroupComponent,
		UserGroupModifyComponent,
		SystemDeleteConfirmationComponent
	],
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		SharedModule,
		FlexLayoutModule,
		CoreRoutingModule
	],
	entryComponents: [
		BranchModifyComponent,
		DepartmentModifyComponent,
		GroupModifyComponent,
		OrganizationModifyComponent,
		OrganizationTypeModifyComponent,
		StatusModifyComponent,
		UserModifyComponent,
		UserGroupModifyComponent,
		SystemDeleteConfirmationComponent
	]
})
export class CoreModule { }