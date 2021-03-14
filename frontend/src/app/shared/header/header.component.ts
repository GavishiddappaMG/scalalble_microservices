import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  notificationCount = 0;
  isThemeDark = false;
  activeTheme = 'indigo-pink';

  nofitifications = [];

  @Output() sidenavStatus = new EventEmitter();
  constructor(
    private utilService: UtilService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  themes: string[] = [
    'deeppurple-amber',
    'indigo-pink',
    'pink-bluegrey',
    'purple-green',
  ];

  ngOnInit() {
    this.getNotification();
  }

  getNotification() {

  }

  toggle() {
    this.sidenavStatus.emit();
  }

  toggleDarkness() {
    // this.isThemeDark = !this.isThemeDark;
    this.utilService.themeStatus.next({ theme: this.activeTheme, darkness: this.isThemeDark });
    console.log(this.isThemeDark);
  }

  setActiveTheme(theme: string, darkness: boolean = null) {
    this.activeTheme = theme;
    this.utilService.themeStatus.next({ theme: theme, darkness: darkness });
  }

  logout() {
    this.authService.logout();
  }

  readMessage(element: any): void {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.updateStatus(element.notificationId);
    });
  }


}
