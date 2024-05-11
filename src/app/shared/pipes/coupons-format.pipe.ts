import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'couponsFormat',
  standalone: true
})
export class CouponsFormatPipe implements PipeTransform {

  transform(value: number): string {

    return (value * 100) as any + '%';
  }

}
