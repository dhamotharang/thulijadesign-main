import { Trainer } from '../../../shared/models/trainer/trainer';
import { AddressType } from '../../../shared/models/general/address-type';
import { State } from '../../../shared/models/general/state';
import { Country } from '../../../shared/models/general/country';

export class TrainerAddress {

	public options:{} = {};

    constructor(public id?:number, 
		public trainer?:Trainer,
		public addressType?:AddressType,
		public contactPersonName?:string,
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