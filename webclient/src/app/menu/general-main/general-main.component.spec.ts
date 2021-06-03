import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMainComponent } from './general-main.component';

describe('GeneralMainComponent', () => {
	let component: GeneralMainComponent;
	let fixture: ComponentFixture<GeneralMainComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ GeneralMainComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GeneralMainComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
