import { Injectable } from '@angular/core';
import { MultimediaDetail } from '../../models/multimedia-detail';

@Injectable({
	providedIn: 'root'
})
export class MediaService {

	public media:MultimediaDetail;

	parse(url:string):MultimediaDetail {
		this.media = new MultimediaDetail("", "", "", "", "", "");
		let mediaSegments:string[] = url.split(":");
		this.media.mediaType = mediaSegments[0].split("-")[1];
		this.media.mediaSource = mediaSegments[0].split("-")[0];
		this.media.mediaUrl = mediaSegments.slice(1).join(':').substring(1);
		this.media.mediaImageUrl = "";
		if (this.media.mediaSource === "youtube" && this.media.mediaType == "video") {
			this.media.mediaId = this.media.mediaUrl.split("/").pop();
			this.media.mediaImageUrl = "https://img.youtube.com/vi/" + this.media.mediaId + "/0.jpg";
		}
		if (this.media.mediaSource === "googledrive" && this.media.mediaType === "pdf") {
			let elements:string[] = this.media.mediaUrl.split("/");
			elements.pop();
			this.media.mediaId = elements.pop();
			this.media.mediaImageUrl = "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg";
		}
		if (this.media.mediaSource === "frompc" && this.media.mediaType === "pdf") {
			this.media.mediaImageUrl = "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg";
		}
		return {
			mediaId: this.media.mediaId,
			mediaType: this.media.mediaType,
			mediaSource: this.media.mediaSource,
			mediaUrl: this.media.mediaUrl,
			mediaImageUrl: this.media.mediaImageUrl
		}
	}

}
