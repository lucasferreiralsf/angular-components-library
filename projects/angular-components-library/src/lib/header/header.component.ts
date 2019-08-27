import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'sb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() logoImgSrc?: string;
  @Input() appName?: string;

  @Input() showMenuButton?: boolean;
  constructor(private headerService: HeaderService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    // this.showMenuButton = this.headerService.hasSideNav;

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.showMenuButton = this.headerService.showMenu;
    this.cd.detectChanges();
  }

  showMenuButtonClick() {
    this.headerService.showMenuClick();
  }
}
