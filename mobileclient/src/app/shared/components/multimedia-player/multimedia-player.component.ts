import { Component, OnInit } from '@angular/core';
import { MultimediaDetail } from 'src/app/shared/models/multimedia-detail';
import { MultimediaPopupHandler } from '../../services/builtin/multimedia-popup-handler';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-multimedia-player',
	templateUrl: './multimedia-player.component.html',
	styleUrls: ['./multimedia-player.component.css']
})
export class MultimediaPlayerComponent implements OnInit {

	public multimediaDetail:MultimediaDetail;
	public safeUrl:SafeUrl;
	public pdfUrl:string;

	constructor(private ref: MultimediaPopupHandler, private domSanitizer:DomSanitizer) {
		this.multimediaDetail = ref.data;
		if (this.multimediaDetail.mediaSource === "youtube" && this.multimediaDetail.mediaType === "video") {
			this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
				"https://www.youtube.com/embed/" + this.multimediaDetail.mediaId);
		}
		if (this.multimediaDetail.mediaSource === "googledrive" && this.multimediaDetail.mediaType === "pdf") {
			this.pdfUrl = "https://drive.google.com/file/d/0B3VnSl89GUNxaXI1NzNrLUZTYWs/preview";
		}
		if (this.multimediaDetail.mediaSource === "frompc" && this.multimediaDetail.mediaType === "pdf") {
			this.safeUrl = environment.apiEndpoint + "/download?relativepath=" + this.multimediaDetail.mediaUrl;
		}
	}

	ngOnInit() {}

	close(value: string) {
		this.ref.close(value);
	}

}