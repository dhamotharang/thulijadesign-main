import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/builtin/translate.service';

@Pipe({
	name: 'translate'
})
export class TranslatePipe implements PipeTransform {

	constructor(private translate:TranslateService) {
	}

	transform(key: any, args?: any): any {
		return this.translate.data[key] || key;
	}

}