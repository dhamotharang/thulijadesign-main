import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatchScholarPlayerComponent } from './components/batch-scholar-player/batch-scholar-player.component';
import { BatchContentPlayerComponent } from './components/batch-content-player/batch-content-player.component';

const routes: Routes = [
	{ path: 'batchscholarplayers', component: BatchScholarPlayerComponent, pathMatch: 'full' },
	{ path: 'batchscholarplayers/:batchscholarid', children: [
		{ path: 'batchcontentplayers', component: BatchContentPlayerComponent, pathMatch: 'full' },
		{ path: '', redirectTo: 'batchcontentplayers', pathMatch: 'full' }
	]},
	{ path: '', redirectTo: 'batchscholarplayers', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class PluginRoutingModule { }