import { Batch } from '../../../shared/models/program/batch';

export class BatchModule {

	public options:{} = {};

    constructor(public id?:number, 
		public sequence?:number,
		public batch?:Batch,
		public name?:string,
		public description?:string) {
	}

}