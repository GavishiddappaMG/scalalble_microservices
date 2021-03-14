import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component, HostBinding, OnInit } from '@angular/core'
import { OverlayContainer } from '@angular/cdk/overlay'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UtilService } from './services/util.service';


const THEME_DARKNESS_SUFFIX = `-dark`;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('class') activeThemeCssClass: string;
  isThemeDark = false;
  activeTheme: string;

  themes: string[] = [
    'deeppurple-amber',
    'indigo-pink',
    'pink-bluegrey',
    'purple-green',
  ];

  // For navigation (sidenav/toolbar). Isn't related to dynamic-theme-switching:
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  // `breakpointObserver` is for navigation (sidenav/toolbar). Isn't related to dynamic-theme-switching:
  constructor(
    private breakpointObserver: BreakpointObserver,
    private overlayContainer: OverlayContainer,
    private utilService: UtilService
  ) {
    // Set default theme here:
    this.setActiveTheme('indigo-pink', false);
  }

  ngOnInit() {
    this.utilService.themeStatus.subscribe((value: any) => {
      this.activeTheme = value.theme;
      this.isThemeDark = value.darkness;
      this.setActiveTheme(this.activeTheme, this.isThemeDark);
    });
  }

  setActiveTheme(theme: string, darkness: boolean = null) {
    if (darkness === null) {
      darkness = this.isThemeDark;
    } else if (this.isThemeDark === darkness) {
      if (this.activeTheme === theme) {
        return;
      }
    } else {
      this.isThemeDark = darkness;
    }

    this.activeTheme = theme;

    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme;

    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass)) {
      classList.replace(this.activeThemeCssClass, cssClass);
    } else {
      classList.add(cssClass);
    }

    this.activeThemeCssClass = cssClass;
  }

  toggleDarkness() {
    this.setActiveTheme(this.activeTheme, !this.isThemeDark);
  }

}
