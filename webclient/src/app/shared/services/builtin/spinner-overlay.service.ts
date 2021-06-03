import { Injectable } from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { defer, NEVER } from 'rxjs';
import { finalize, share } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class SpinnerOverlayService {

	private spinnerTopRef:OverlayRef;

	public readonly spinner = defer(() => {
		this.showSpinner();
		return NEVER.pipe(
			finalize(() => {
				this.stopSpinner();
			})
		);
	}).pipe(share())

	constructor(private overlay: Overlay) {
	}

	public showSpinner() {
		Promise.resolve(null).then(() => {
			this.spinnerTopRef = this.overlay.create({
				hasBackdrop: true,
				backdropClass: 'dark-backdrop',
				positionStrategy: this.overlay.position()
					.global()
					.centerHorizontally()
					.centerVertically()
			});
			this.spinnerTopRef.attach(new ComponentPortal(MatSpinner))
		})
	}

	public stopSpinner() {
		this.spinnerTopRef.detach();
		this.spinnerTopRef = undefined;
	}

}