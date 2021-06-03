import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent
} from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { SpinnerOverlayService } from './spinner-overlay.service';

@Injectable()
export class SpinnerInterceptorService implements HttpInterceptor {

	constructor(private readonly spinnerOverlayService:SpinnerOverlayService) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const spinnerSubscription:Subscription = 
			this.spinnerOverlayService.spinner.subscribe();
		return next.handle(request).pipe(
			finalize(() => spinnerSubscription.unsubscribe())
		);
	}

}