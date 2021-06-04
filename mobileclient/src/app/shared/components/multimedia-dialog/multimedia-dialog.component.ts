import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { MultimediaPopupHandler } from '../../services/builtin/multimedia-popup-handler';

@Component({
	selector: 'app-multimedia-dialog',
	templateUrl: './multimedia-dialog.component.html',
	styleUrls: ['./multimedia-dialog.component.css']
})
export class MultimediaDialogComponent implements OnInit {

	content: Type<any>;

	constructor(private ref: MultimediaPopupHandler) {}

	close() {
		this.ref.close(null);
	}

	ngOnInit() {
		this.content = this.ref.content;
	}

}