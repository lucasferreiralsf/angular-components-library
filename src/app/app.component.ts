import { Component, OnInit, EventEmitter } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SidenavService } from 'projects/subway-framework/src/lib/side-nav/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'subway-angular-framework';

  isDarkTheme = new EventEmitter<boolean>();
  isExpanded = true;
  isShowing = false;
  isHideToggle = !this.isExpanded;
  expandHeight = '42px';
  collapseHeight = '42px';

  constructor(private overlayContainer: OverlayContainer, private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.expandEmitter.subscribe(e => {
      this.isExpanded = e;
    });

    this.sidenavService.showEmitter.subscribe(e => {
      this.isShowing = e;
    });

    this.sidenavService.hideToggleEmitter.subscribe(e => {
      this.isHideToggle = e;
    });
  }

  changeColorTheme(colorTheme: string) {
    if (colorTheme === 'dark') {
      this.isDarkTheme.emit(true);
      setTimeout(() => {
        this.overlayContainer
          .getContainerElement()
          .classList.add('sb-dark-theme');
      }, 300);
    } else {
      this.isDarkTheme.emit(false);
      setTimeout(() => {
        this.overlayContainer
          .getContainerElement()
          .classList.remove('sb-dark-theme');
      }, 300);
    }
  }

}
