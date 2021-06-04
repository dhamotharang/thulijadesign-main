import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimediaPlayerComponent } from './multimedia-player.component';

describe('PdfDialogComponent', () => {

	let component: MultimediaPlayerComponent;
	let fixture: ComponentFixture<MultimediaPlayerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MultimediaPlayerComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MultimediaPlayerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});