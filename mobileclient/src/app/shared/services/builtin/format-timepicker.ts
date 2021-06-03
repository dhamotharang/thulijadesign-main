export function toTwentyFourHours(strTime:string) {
	if (strTime === null) return "";
	let AMPM:string = strTime.slice(-2);
	let timeArr:string[] = strTime.slice(0, -2).split(":");
	if (AMPM === "AM" && timeArr[0] === "12") {
		timeArr[0] = "00";
	} else if (AMPM === "PM") {
		timeArr[0] = "" + ((+timeArr[0] % 12) + 12);
	}
	return timeArr.join(":");
}

export function toTwelveHours(strTime:string) {
	if (strTime === null) return "";
	let timeArr:string[] = strTime.slice(0, -2).split(":");
	let AMPM:string = +timeArr[0] >= 12 ? " PM" : " AM";
	timeArr[0] = "" + ((+timeArr[0] % 12) || 12);
	timeArr = [timeArr[0], timeArr[1]]
	return timeArr.join(":") + AMPM;
}