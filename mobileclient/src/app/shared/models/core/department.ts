import { Organization } from '../../../shared/models/core/organization';
import { Branch } from '../../../shared/models/core/branch';

export class Department {

	public options:{} = {};

    constructor(public id?:number, 
		public sequence?:number,
		public organization?:Organization,
		public branch?:Branch,
		public abbreviation?:string,
		public name?:string) {
	}

}