import { Organization } from '../../../shared/models/core/organization';

export class Branch {

	public options:{} = {};

    constructor(public id?:number, 
		public sequence?:number,
		public organization?:Organization,
		public abbreviation?:string,
		public name?:string) {
	}

}