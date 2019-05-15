import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'cepMask'})
export class CepPipe implements PipeTransform {

   transform(value: string) {
      if (value) {
           value = value.toString();
           if (value.length == 8) {
            return value.substring(0, 2).concat('.')
                        .concat(value.substring(2, 5))
                        .concat('-')
                        .concat(value.substring(5, 8));
           }
       }
       return value;
   }
}
