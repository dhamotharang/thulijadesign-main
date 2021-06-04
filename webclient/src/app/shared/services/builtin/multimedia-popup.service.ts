import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, Type } from '@angular/core';
import { MultimediaPopupHandler } from './multimedia-popup-handler';
import { MultimediaDialogComponent } from '../../components/multimedia-dialog/multimedia-dialog.component';
import { MultimediaPlayerComponent } from '../../components/multimedia-player/multimedia-player.component';
import { MultimediaDetail } from '../../models/multimedia-detail';

@Injectable({
	providedIn: 'root'
})
export class MultimediaPopupService {

	constructor(private overlay: Overlay, private injector: Injector) {}

	open<R = any>(data: MultimediaDetail): MultimediaPopupHandler<R> {

		const configs = new OverlayConfig({
			hasBackdrop: true,
			panelClass: ['modal', 'is-active'],
			backdropClass: 'modal-background'
		});

		let content: Type<any>;
		const overlayRef = this.overlay.create({
			hasBackdrop: true,
			backdropClass: 'dark-backdrop',
			positionStrategy: this.overlay.position()
				.global()
				.centerHorizontally()
				.centerVertically()
		});
		const myOverlayRef = new MultimediaPopupHandler<R>(overlayRef, MultimediaPlayerComponent, data);
		const injector = this.createInjector(myOverlayRef, this.injector);
		overlayRef.attach(new ComponentPortal(MultimediaDialogComponent, null, injector));
		return myOverlayRef;

	}

	createInjector(ref: MultimediaPopupHandler, inj: Injector) {
		const injectorTokens = new WeakMap([[MultimediaPopupHandler, ref]]);
		return new PortalInjector(inj, injectorTokens);
	}

}