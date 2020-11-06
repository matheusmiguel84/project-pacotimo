import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDateTime'
})
export class LocalDateTimePipe implements PipeTransform {

  transform(date: string): string {
    const FormatDate = new Date(date).toLocaleDateString();
    return FormatDate;
  }

}
