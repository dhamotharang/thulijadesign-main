import { Scholar } from '../../../shared/models/scholar/scholar';
import { RelationType } from '../../../shared/models/general/relation-type';
import { Citizen } from '../../../shared/models/general/citizen';

export class ScholarFamily {

	public options:{} = {};

    constructor(public id?:number, 
		public scholar?:Scholar,
		public relationType?:RelationType,
		public name?:string,
		public occupation?:string,
		public citizen?:Citizen,
		public nricNumber?:string,
		public email?:string,
		public phone?:string) {
	}

}