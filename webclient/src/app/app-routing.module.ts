import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';
import { SetupComponent } from './shared/components/setup/setup.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';
import { UserProfileComponent } from './core/components/user-profile/user-profile.component';

import { CoreMainComponent } from './menu/core-main/core-main.component';
import { GeneralMainComponent } from './menu/general-main/general-main.component';

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
    { path: 'trainer', 
        loadChildren: () => import('./trainer/trainer.module').then(m => m.TrainerModule) },
    { path: 'masterdetail', 
        loadChildren: () => import('./master-detail/master-detail.module').then(m => m.MasterDetailModule) },
	{ path: 'trainerprofile', 
		loadChildren: () => import('./trainer-profile/trainer-profile.module').then(m => m.TrainerProfileModule) },
    { path:'coremain', component:CoreMainComponent, children: [
        {
            path: 'core', 
            loadChildren: () => import('./core/core.module').then(m => m.CoreModule), 
            outlet:'sidebar' 
        },
        {
            path: 'masterdetail',
            loadChildren: () => import('./master-detail/master-detail.module').then(m => m.MasterDetailModule),
            outlet:'sidebar'
        }
    ]},
    { path:'generalmain', component:GeneralMainComponent, children: [
        {
            path: 'general', 
            loadChildren: () => import('./general/general.module').then(m => m.GeneralModule), 
            outlet:'sidebar' 
        }
    ]},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }  