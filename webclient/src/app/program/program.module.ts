import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ProgramRoutingModule } from './program-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CUSTOM_DATE_FORMATS } from '../shared/services/builtin/format-datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { BatchContentComponent } from './components/batch-content/batch-content.component';
import { BatchContentModifyComponent } from './components/batch-content-modify/batch-content-modify.component';
import { BatchPrerequisiteComponent } from './components/batch-prerequisite/batch-prerequisite.component';
import { BatchPrerequisiteModifyComponent } from './components/batch-prerequisite-modify/batch-prerequisite-modify.component';
import { ProgramCategoryComponent } from './components/program-category/program-category.component';
import { ProgramCategoryModifyComponent } from './components/program-category-modify/program-category-modify.component';
import { ProgramTypeComponent } from './components/program-type/program-type.component';
import { ProgramTypeModifyComponent } from './components/program-type-modify/program-type-modify.component';
import { TrainingDeliveryComponent } from './components/training-delivery/training-delivery.component';
import { TrainingDeliveryModifyComponent } from './components/training-delivery-modify/training-delivery-modify.component';
import { TrainingModeComponent } from './components/training-mode/training-mode.component';
import { TrainingModeModifyComponent } from './components/training-mode-modify/training-mode-modify.component';
import { SystemDeleteConfirmationComponent } from './components/system-delete-confirmation/system-delete-confirmation.component';

@NgModule({
	declarations: [
		BatchContentComponent,
		BatchContentModifyComponent,
		BatchPrerequisiteComponent,
		BatchPrerequisiteModifyComponent,
		ProgramCategoryComponent,
		ProgramCategoryModifyComponent,
		ProgramTypeComponent,
		ProgramTypeModifyComponent,
		TrainingDeliveryComponent,
		TrainingDeliveryModifyComponent,
		TrainingModeComponent,
		TrainingModeModifyComponent,
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
		ProgramRoutingModule
	],
	entryComponents: [
		BatchContentModifyComponent,
		BatchPrerequisiteModifyComponent,
		ProgramCategoryModifyComponent,
		ProgramTypeModifyComponent,
		TrainingDeliveryModifyComponent,
		TrainingModeModifyComponent,
		SystemDeleteConfirmationComponent
	]
})
export class ProgramModule { }