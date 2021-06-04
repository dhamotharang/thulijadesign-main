import { Subject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { Type } from '@angular/core';
import { MultimediaDetail } from '../../models/multimedia-detail';

export interface OverlayCloseEvent<R> {
	type: 'backdropClick' | 'close';
	data: R;
}

export class MultimediaPopupHandler<R = any> {

	afterClosed$ = new Subject<OverlayCloseEvent<R>>();

	constructor(public overlay: OverlayRef, public content: Type<any>, public data: MultimediaDetail) {
		overlay.backdropClick().subscribe(() => this._close('backdropClick', null));
	}

	close(data?: R) {
		this._close('close', data);
	}

	private _close(type: 'backdropClick' | 'close', data: R) {
		this.overlay.dispose();
		this.afterClosed$.next({ type, data });
		this.afterClosed$.complete();
	}

}