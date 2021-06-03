import { Department } from '../../../shared/models/core/department';
import { Branch } from '../../../shared/models/core/branch';
import { Organization } from '../../../shared/models/core/organization';
import { Status } from '../../../shared/models/core/status';
import { GroupMenu } from './group-menu';
import { Group } from './group';

export class User {

	public options:{} = {};
	public groups:Group[];
	public groupMenus:GroupMenu[];

    constructor(public id?:number, 
		public organization?:Organization,
		public branch?:Branch,
		public department?:Department,
		public firstName?:string,
		public lastName?:string,
		public emailAddress?:string,
		public password?:string,
		public numLogins?:number,
		public lastLoginTime?:Date,
		public status?:Status,
		public profile?:string) {
	}

}