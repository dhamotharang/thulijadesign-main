import { TestBed } from '@angular/core/testing';

import { MultimediaPopupService } from './multimedia-popup.service';

describe('OverlayService', () => {

	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: MultimediaPopupService = TestBed.get(MultimediaPopupService);
		expect(service).toBeTruthy();
	});

});