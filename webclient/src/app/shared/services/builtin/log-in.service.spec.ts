import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

	constructor() { }
	
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let currentUser = JSON.parse(localStorage.getItem('user'));
		if (currentUser) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${currentUser.oauth_uid}`
				}
			});
		}
		return next.handle(request);
	}

}
