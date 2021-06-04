import { Subject } from 'rxjs';
import { Type } from '@angular/core';
import { MultimediaDetail } from '../../models/multimedia-detail';

export interface OverlayCloseEvent<R> {
	type: 'backdropClick' | 'close';
	data: R;
}

export class MultimediaPopupHandler<R = any> {

	afterClosed$ = new Subject<OverlayCloseEvent<R>>();

	constructor(public content: Type<any>, public data: MultimediaDetail) {
	}

	close(data?: R) {
		this._close('close', data);
	}

	private _close(type: 'backdropClick' | 'close', data: R) {
	}

}