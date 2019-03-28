import { Directive } from '@angular/core';
import { HeaderService } from './header.service';

@Directive({
  selector: '[sbHasSideNav]'
})
export class HeaderDirective {

  constructor(headerService: HeaderService) {
    headerService.showMenuButton(true);
  }

}
