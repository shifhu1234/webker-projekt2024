import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFormat',
  standalone: true
})
export class NameFormatPipe implements PipeTransform {

  transform(value: any): string {
    if (value && value.name && value.name.firstname && value.name.lastname) {
      return `${value.name.firstname} ${value.name.lastname}`;
    } else {
      return '';
    }
  }

}
