import { Group } from '../../../shared/models/core/group';

export class GroupMenu {

	public options:{} = {};

    constructor(public id?:number, 
		public group?:Group,
		public sequence?:number,
		public name?:string,
		public icon?:string) {
	}

}