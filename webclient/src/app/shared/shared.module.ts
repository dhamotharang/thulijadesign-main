import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { SetupComponent } from './components/setup/setup.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardComponent } from './components/dashboard-components/card/card.component';
import { MiniCardComponent } from './components/dashboard-components/mini-card/mini-card.component';

import { ParticipantRegistrationChartComponent } from './components/dashboard-components/charts/participant-registration-chart/participant-registration-chart.component';
import { ProductSalesChartComponent } from './components/dashboard-components/charts/product-sales-chart/product-sales-chart.component';
import { SalesTrafficChartComponent } from './components/dashboard-components/charts/sales-traffic-chart/sales-traffic-chart.component';
import { StoreSessionsChartComponent } from './components/dashboard-components/charts/store-sessions-chart/store-sessions-chart.component';
import { OrdersTableComponent } from './components/dashboard-components/charts/orders-table/orders-table.component';

import { MenuHeightDirective } from './directives/menu-height.directive';

import { TranslatePipe } from './pipes/translate.pipe';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { TranslateService } from './services/builtin/translate.service';
import { SpinnerInterceptorService } from './services/builtin/spinner-interceptor.service';

@NgModule({
	declarations: [
		SetupComponent,
		LoginComponent,
    	RegistrationComponent,
		ForgotPasswordComponent,
		ChangePasswordComponent,
		DashboardComponent,
		CardComponent,
		MiniCardComponent,
		ParticipantRegistrationChartComponent,
		ProductSalesChartComponent,
		SalesTrafficChartComponent,
		StoreSessionsChartComponent,
		OrdersTableComponent,
		MenuHeightDirective,
		TranslatePipe,
		FormatTimePipe
	],
	providers: [ 
		{ provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true }
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule,
		MaterialModule,
		ChartsModule,
		NgxExtendedPdfViewerModule
	],
	exports: [
		MenuHeightDirective,
		TranslatePipe,
		FormatTimePipe
	]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders<SharedModule> {
		return {
			ngModule: SharedModule,
			providers: [ TranslateService ]
		};
	}
}