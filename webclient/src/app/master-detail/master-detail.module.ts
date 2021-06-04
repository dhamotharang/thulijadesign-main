import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { MasterDetailRoutingModule } from './master-detail-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CUSTOM_DATE_FORMATS } from '../shared/services/builtin/format-datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { GroupManagerComponent } from './components/group-manager/group-manager.component';
import { GroupManagerModifyComponent } from './components/group-manager-modify/group-manager-modify.component';
import { GroupManagerMenuComponent } from './components/group-manager-menu/group-manager-menu.component';
import { UserGroupManagerComponent } from './components/user-group-manager/user-group-manager.component';
import { UserGroupManagerModifyComponent } from './components/user-group-manager-modify/user-group-manager-modify.component';
import { ScholarManagerComponent } from './components/scholar-manager/scholar-manager.component';
import { ScholarManagerModifyComponent } from './components/scholar-manager-modify/scholar-manager-modify.component';
import { ScholarManagerMenuComponent } from './components/scholar-manager-menu/scholar-manager-menu.component';
import { ScholarDetailManagerComponent } from './components/scholar-detail-manager/scholar-detail-manager.component';
import { ScholarDetailManagerModifyComponent } from './components/scholar-detail-manager-modify/scholar-detail-manager-modify.component';
import { ScholarAddressManagerComponent } from './components/scholar-address-manager/scholar-address-manager.component';
import { ScholarAddressManagerModifyComponent } from './components/scholar-address-manager-modify/scholar-address-manager-modify.component';
import { ScholarFamilyManagerComponent } from './components/scholar-family-manager/scholar-family-manager.component';
import { ScholarFamilyManagerModifyComponent } from './components/scholar-family-manager-modify/scholar-family-manager-modify.component';
import { ScholarEducationDetailManagerComponent } from './components/scholar-education-detail-manager/scholar-education-detail-manager.component';
import { ScholarEducationDetailManagerModifyComponent } from './components/scholar-education-detail-manager-modify/scholar-education-detail-manager-modify.component';
import { ScholarOccupationManagerComponent } from './components/scholar-occupation-manager/scholar-occupation-manager.component';
import { ScholarOccupationManagerModifyComponent } from './components/scholar-occupation-manager-modify/scholar-occupation-manager-modify.component';
import { ProgramMasterManagerComponent } from './components/program-master-manager/program-master-manager.component';
import { ProgramMasterManagerModifyComponent } from './components/program-master-manager-modify/program-master-manager-modify.component';
import { ProgramMasterManagerMenuComponent } from './components/program-master-manager-menu/program-master-manager-menu.component';
import { ProgramTagManagerComponent } from './components/program-tag-manager/program-tag-manager.component';
import { ProgramTagManagerModifyComponent } from './components/program-tag-manager-modify/program-tag-manager-modify.component';
import { ProgramManagerComponent } from './components/program-manager/program-manager.component';
import { ProgramManagerModifyComponent } from './components/program-manager-modify/program-manager-modify.component';
import { ProgramManagerMenuComponent } from './components/program-manager-menu/program-manager-menu.component';
import { BatchManagerComponent } from './components/batch-manager/batch-manager.component';
import { BatchManagerModifyComponent } from './components/batch-manager-modify/batch-manager-modify.component';
import { BatchManagerMenuComponent } from './components/batch-manager-menu/batch-manager-menu.component';
import { BatchPrerequisiteManagerComponent } from './components/batch-prerequisite-manager/batch-prerequisite-manager.component';
import { BatchPrerequisiteManagerModifyComponent } from './components/batch-prerequisite-manager-modify/batch-prerequisite-manager-modify.component';
import { BatchScholarManagerComponent } from './components/batch-scholar-manager/batch-scholar-manager.component';
import { BatchScholarManagerModifyComponent } from './components/batch-scholar-manager-modify/batch-scholar-manager-modify.component';
import { ScholarBatchRegistrationManagerComponent } from './components/scholar-batch-registration-manager/scholar-batch-registration-manager.component';
import { BatchModuleManagerComponent } from './components/batch-module-manager/batch-module-manager.component';
import { BatchModuleManagerModifyComponent } from './components/batch-module-manager-modify/batch-module-manager-modify.component';
import { BatchContentManagerComponent } from './components/batch-content-manager/batch-content-manager.component';
import { BatchContentManagerModifyComponent } from './components/batch-content-manager-modify/batch-content-manager-modify.component';
import { SystemDeleteConfirmationComponent } from './components/system-delete-confirmation/system-delete-confirmation.component';

@NgModule({
	declarations: [
		GroupManagerComponent,
		GroupManagerModifyComponent,
		GroupManagerMenuComponent,
		UserGroupManagerComponent,
		UserGroupManagerModifyComponent,
		ScholarManagerComponent,
		ScholarManagerModifyComponent,
		ScholarManagerMenuComponent,
		ScholarDetailManagerComponent,
		ScholarDetailManagerModifyComponent,
		ScholarAddressManagerComponent,
		ScholarAddressManagerModifyComponent,
		ScholarFamilyManagerComponent,
		ScholarFamilyManagerModifyComponent,
		ScholarEducationDetailManagerComponent,
		ScholarEducationDetailManagerModifyComponent,
		ScholarOccupationManagerComponent,
		ScholarOccupationManagerModifyComponent,
		ProgramMasterManagerComponent,
		ProgramMasterManagerModifyComponent,
		ProgramMasterManagerMenuComponent,
		ProgramTagManagerComponent,
		ProgramTagManagerModifyComponent,
		ProgramManagerComponent,
		ProgramManagerModifyComponent,
		ProgramManagerMenuComponent,
		BatchManagerComponent,
		BatchManagerModifyComponent,
		BatchManagerMenuComponent,
		BatchPrerequisiteManagerComponent,
		BatchPrerequisiteManagerModifyComponent,
		BatchScholarManagerComponent,
		BatchScholarManagerModifyComponent,
		ScholarBatchRegistrationManagerComponent,
		BatchModuleManagerComponent,
		BatchModuleManagerModifyComponent,
		BatchContentManagerComponent,
		BatchContentManagerModifyComponent,
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
		MasterDetailRoutingModule
	],
	entryComponents: [
		GroupManagerModifyComponent,
		UserGroupManagerModifyComponent,
		ScholarManagerModifyComponent,
		ScholarDetailManagerModifyComponent,
		ScholarAddressManagerModifyComponent,
		ScholarFamilyManagerModifyComponent,
		ScholarEducationDetailManagerModifyComponent,
		ScholarOccupationManagerModifyComponent,
		ProgramMasterManagerModifyComponent,
		ProgramTagManagerModifyComponent,
		ProgramManagerModifyComponent,
		BatchManagerModifyComponent,
		BatchPrerequisiteManagerModifyComponent,
		BatchScholarManagerModifyComponent,
		BatchModuleManagerModifyComponent,
		BatchContentManagerModifyComponent,
		SystemDeleteConfirmationComponent
	]
})
export class MasterDetailModule { }