import { Batch } from '../../../shared/models/program/batch';
import { BatchModule } from '../../../shared/models/program/batch-module';

export class BatchContent {

	public options:{} = {};

    constructor(public id?:number, 
		public sequence?:number,
		public batch?:Batch,
		public batchModule?:BatchModule,
		public name?:string,
		public description?:string,
		public contentUrl?:string,
		public contentUrlImageUrl?:string) {
	}

}