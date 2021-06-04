import { Program } from '../../../shared/models/program/program';
import { State } from '../../../shared/models/general/state';
import { Country } from '../../../shared/models/general/country';

export class Batch {

	public options:{} = {};

    constructor(public id?:number, 
		public program?:Program,
		public code?:string,
		public lectureStartDate?:Date,
		public lectureEndDate?:Date,
		public lectureDurationDays?:number,
		public lectureDurationHours?:number,
		public onlineStartDate?:Date,
		public onlineEndDate?:Date,
		public onlineDurationDays?:number,
		public onlineDurationHours?:number,
		public mentoringStartDate?:Date,
		public mentoringEndDate?:Date,
		public mentoringDurationDays?:number,
		public mentoringDurationHours?:number,
		public contactPersonName?:string,
		public locationName?:string,
		public houseNumber?:string,
		public addressLineOne?:string,
		public addressLineTwo?:string,
		public postcode?:string,
		public country?:Country,
		public state?:State,
		public district?:string,
		public city?:string,
		public telephoneNumberOne?:string,
		public handphoneNumberOne?:string,
		public emailAddressOne?:string,
		public websiteAddress?:string,
		public latitude?:string,
		public longitude?:string,
		public locationMap?:string,
		public premisePhoto?:string) {
	}

}