import { Directive, Input } from '@angular/core';
import { PopoverDirectionEnum } from './popover-config';
import { PopoverService } from './popover.service';

@Directive({
  selector: '[sbPopover]'
})
export class PopoverDirective {


  constructor(private popoverService: PopoverService) {
  }

}
