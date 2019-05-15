import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'telefoneMask'})
export class TelefonePipe implements PipeTransform {

   transform(value: string) {
      if (value) {
           value = value.toString();
           if (value.length == 11) {
               return '('.concat(value.substring(0, 2).concat(') '))
                                    .concat(value.substring(2, 7))
                                    .concat('-')
                                    .concat(value.substring(7, 11));
           } else {
                return '('.concat(value.substring(0, 2).concat(') '))
                .concat(value.substring(2, 6))
                .concat('-')
                .concat(value.substring(6, 10));
           }
       }
       return value;
   }
}
