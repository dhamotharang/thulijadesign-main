import { Batch } from '../../../shared/models/program/batch';

export class BatchPrerequisite {

	public options:{} = {};

    constructor(public id?:number, 
		public sequence?:number,
		public batch?:Batch,
		public description?:string) {
	}

}