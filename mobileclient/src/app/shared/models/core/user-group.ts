import { Group } from '../../../shared/models/core/group';
import { User } from '../../../shared/models/core/user';

export class UserGroup {

	public options:{} = {};

    constructor(public id?:number, 
		public sequence?:number,
		public group?:Group,
		public user?:User) {
	}

}