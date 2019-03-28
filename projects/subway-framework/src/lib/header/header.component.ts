import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'sb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() logoImgSrc?: string;
  @Input() appName?: string;

  showMenuButton: boolean;

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.showMenuButton = this.headerService.hasSideNav;
  }

  showMenuButtonClick() {
    this.headerService.showMenuClick();
  }

}
