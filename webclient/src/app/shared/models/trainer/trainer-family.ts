import { Trainer } from '../../../shared/models/trainer/trainer';
import { RelationType } from '../../../shared/models/general/relation-type';
import { Citizen } from '../../../shared/models/general/citizen';

export class TrainerFamily {

	public options:{} = {};

    constructor(public id?:number, 
		public trainer?:Trainer,
		public relationType?:RelationType,
		public name?:string,
		public occupation?:string,
		public citizen?:Citizen,
		public nricNumber?:string,
		public email?:string,
		public phone?:string) {
	}

}