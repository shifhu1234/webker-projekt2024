import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'firebaseDateFormat',
    standalone: true
})
export class FirebaseDateFormatPipe implements PipeTransform {

    transform(timestamp: any): string {
        if (!timestamp || !timestamp.seconds) {
            return '';
        }
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        return date.toLocaleString();
    }

}
