import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {

	transform(value: string, ...args: string[]) {
		let hours = new Date(value).getTimezoneOffset() / 60;
		let offset = hours < 0 ? '+' : '-';
		hours = Math.abs(hours);
		if (hours < 10) {
			offset += '0' + hours.toString() + '00';
		}
		else {
			offset += hours.toString() + '00';
		}

		return super.transform(value, args[0], offset);
	}

}
