import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';
import { SetupComponent } from './shared/components/setup/setup.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';
import { UserProfileComponent } from './core/components/user-profile/user-profile.component';

import { CoreMainComponent } from './menu/core-main/core-main.component';
import { GeneralMainComponent } from './menu/general-main/general-main.component';
import { ProgramMainComponent } from './menu/program-main/program-main.component';
import { RegistrationManagerComponent } from './menu/registration-manager/registration-manager.component';

const routes:Routes = [
	{ path:'', redirectTo:'/login', pathMatch:'full' },
	{ path:'setup', component:SetupComponent },
	{ path:'login', component:LoginComponent },
	{ path:'forgotpassword', component:ForgotPasswordComponent },
	{ path:'changepassword', component:ChangePasswordComponent },
	{ path:'profile', component:UserProfileComponent },
	{ path: 'core', 
		loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
	{ path: 'general', 
		loadChildren: () => import('./general/general.module').then(m => m.GeneralModule) },
	{ path: 'program', 
		loadChildren: () => import('./program/program.module').then(m => m.ProgramModule) },
	{ path: 'registration', 
		loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
	{ path: 'scholar', 
		loadChildren: () => import('./scholar/scholar.module').then(m => m.ScholarModule) },
	{ path: 'masterdetail', 
		loadChildren: () => import('./master-detail/master-detail.module').then(m => m.MasterDetailModule) },
	{ path: 'plugin', 
		loadChildren: () => import('./plugin/plugin.module').then(m => m.PluginModule) },
	{ path: 'scholarprofile', 
		loadChildren: () => import('./scholar-profile/scholar-profile.module').then(m => m.ScholarProfileModule) },
	{ path:'coremain', component:CoreMainComponent, children: [
		{
			path: 'core', 
			loadChildren: () => import('./core/core.module').then(m => m.CoreModule) 
		},
		{
			path: 'masterdetail',
			loadChildren: () => import('./master-detail/master-detail.module').then(m => m.MasterDetailModule)
		}
    ]},
	{ path:'generalmain', component:GeneralMainComponent, children: [
		{
			path: 'general', 
			loadChildren: () => import('./general/general.module').then(m => m.GeneralModule) 
		}
    ]},
	{ path:'programmain', component:ProgramMainComponent, children: [
		{
			path: 'masterdetail',
			loadChildren: () => import('./master-detail/master-detail.module').then(m => m.MasterDetailModule)
		},
		{
			path: 'program', 
			loadChildren: () => import('./program/program.module').then(m => m.ProgramModule) 
		}
    ]},
	{ path:'registrationmanager', component:RegistrationManagerComponent, children: [
		{
			path: 'registration', 
			loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) 
		}
    ]},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }