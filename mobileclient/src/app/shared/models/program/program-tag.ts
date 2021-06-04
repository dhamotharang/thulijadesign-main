import { ProgramMaster } from '../../../shared/models/program/program-master';

export class ProgramTag {

	public options:{} = {};

    constructor(public id?:number, 
		public sequence?:number,
		public programMaster?:ProgramMaster,
		public name?:string) {
	}

}