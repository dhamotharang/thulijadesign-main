import { Injectable } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { defer, NEVER } from 'rxjs';
import { finalize, share } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class SpinnerOverlayService {

	private isLoading:boolean = false;

	public readonly spinner = defer(() => {
		this.present();
		return NEVER.pipe(
			finalize(() => {
				this.dismiss();
			})
		);
	}).pipe(share())

	constructor(private loadingController: LoadingController) { }

	async present() {
		this.isLoading = true;
		return await this.loadingController.create({
			message: 'Processing Server Request',
			duration: 2000
		}).then((res) => {
			res.present().then(() => {
				if (!this.isLoading) {
					res.dismiss().then(() => {});
				}
			})
			res.onDidDismiss().then((dis) => { });
		});
	}

	async dismiss() {
		this.isLoading = false;
		return await this.loadingController.dismiss().then(() => {});
	}

}