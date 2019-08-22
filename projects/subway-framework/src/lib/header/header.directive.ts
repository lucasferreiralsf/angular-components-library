import { Directive, Input } from '@angular/core';
import { HeaderService } from './header.service';
import { SidenavService } from '../side-nav/sidenav.service';

@Directive({
  selector: '[sbHeader]'
})
export class HeaderDirective {
  @Input('sbHasToggleSidenav') hasToggleSidenav: boolean;

  constructor(headerService: HeaderService, sidenavService: SidenavService) {
    // if (this.hasToggleSidenav || this.sbHeader) {
      headerService.showMenuButton(true);
      sidenavService.disableClose(false);
    // }
  }
}
