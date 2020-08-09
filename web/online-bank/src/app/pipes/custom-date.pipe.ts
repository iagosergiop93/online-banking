import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {

	transform(value: string, ...args: string[]) {
		const date = new Date(value);
		const minutes = new Date().getTimezoneOffset();
		date.setTime(date.getTime() - minutes * 60 * 1000);

		return super.transform(date, ...args);
	}

}
