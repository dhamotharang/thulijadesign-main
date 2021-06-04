import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PluginRoutingModule } from './plugin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { BatchScholarPlayerComponent } from './components/batch-scholar-player/batch-scholar-player.component';
import { BatchContentPlayerComponent } from './components/batch-content-player/batch-content-player.component';

@NgModule({
	declarations: [
		BatchScholarPlayerComponent,
		BatchContentPlayerComponent
	],
	providers: [
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		EditorModule,
		SharedModule,
		PluginRoutingModule,
		NgxExtendedPdfViewerModule,
		PdfViewerModule
	]
})
export class PluginModule { }