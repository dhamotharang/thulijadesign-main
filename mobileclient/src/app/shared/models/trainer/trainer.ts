import { Salutation } from '../../../shared/models/general/salutation';
import { Gender } from '../../../shared/models/general/gender';
import { Citizen } from '../../../shared/models/general/citizen';
import { Department } from '../../../shared/models/core/department';
import { Branch } from '../../../shared/models/core/branch';
import { Organization } from '../../../shared/models/core/organization';
import { Status } from '../../../shared/models/core/status';
import { User } from '../core/user';

export class Trainer {

	public options:{} = {};

    constructor(public id?:number, 
		public organization?:Organization,
		public branch?:Branch,
		public department?:Department,
		public icNumber?:string,
		public salutation?:Salutation,
		public firstName?:string,
		public lastName?:string,
		public gender?:Gender,
		public citizen?:Citizen,
		public handphoneNumber?:string,
		public emailAddress?:string,
		public password?:string,
		public numLogins?:number,
		public lastLoginTime?:Date,
		public status?:Status,
		public user?:User) {
	}

}