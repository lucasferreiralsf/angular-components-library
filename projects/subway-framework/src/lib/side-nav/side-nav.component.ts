import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HeaderService } from '../header/header.service';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'sb-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '238px'
      })),
      state('closed', style({
        width: '72px'
      })),
      transition('open => closed', [
        style({ width: '72px' }),
        animate('200ms ease-in')
      ]),
      transition('closed => open', [
        style({ width: '238px' }),
        animate('200ms ease-in')
      ]),
    ]),
  ]
})
export class SideNavComponent implements OnInit {

  isExpanded = true;
  isShowing = false;
  isHideToggle = !this.isExpanded;
  @Input() isRenderSidenav: boolean;

  constructor(private headerService: HeaderService, private sidenavService: SidenavService) {}

  ngOnInit() {
    this.headerService.showMenuClickEvent.subscribe(() => {
      if (this.isExpanded === true) {
        this.sidenavService.expandEmit(false);
        this.isExpanded = false;
      } else {
        this.sidenavService.expandEmit(true);
        this.isExpanded = true;
      }

      if (this.isHideToggle === true) {
        this.sidenavService.hideToggleEmit(false);
        this.isHideToggle = false;
      } else {
        this.sidenavService.hideToggleEmit(true);
        this.isHideToggle = true;
      }
    });
  }

  public mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
      this.sidenavService.showEmit(true);
      this.isHideToggle = false;
      this.sidenavService.hideToggleEmit(false);
    }
  }

  public mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
      this.sidenavService.showEmit(false);
      this.isHideToggle = true;
      this.sidenavService.hideToggleEmit(true);
    }
  }

}
