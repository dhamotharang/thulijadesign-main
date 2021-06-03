import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

	constructor() {
	}

	transform(value: string, ...args: any[]): string {
		if (value !== null) {
			let timeArr:string[] = value.slice(0, -2).split(":");
			let AMPM:string = +timeArr[0] >= 12 ? " PM" : " AM";
			timeArr[0] = "" + ((+timeArr[0] % 12) || 12);
			timeArr = [timeArr[0], timeArr[1]]
			return timeArr.join(":") + AMPM;
		}
		return "";
	}

}