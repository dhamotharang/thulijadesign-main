import { Injectable, Injector, Type } from '@angular/core';
import { MultimediaPopupHandler } from './multimedia-popup-handler';
import { MultimediaDialogComponent } from '../../components/multimedia-dialog/multimedia-dialog.component';
import { MultimediaPlayerComponent } from '../../components/multimedia-player/multimedia-player.component';
import { MultimediaDetail } from '../../models/multimedia-detail';

@Injectable({
	providedIn: 'root'
})
export class MultimediaPopupService {

	constructor(private injector: Injector) {}

	open<R = any>(data: MultimediaDetail): MultimediaPopupHandler<R> {
		return null;
	}

	createInjector(ref: MultimediaPopupHandler, inj: Injector) {
	}

}