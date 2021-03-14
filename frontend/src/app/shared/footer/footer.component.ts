import { Component, OnInit } from '@angular/core';
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  today: Date;
  currentYear: number;
  constructor() { }

  ngOnInit() {
    this.today = new Date();
    this.currentYear = this.today.getFullYear();
  }

}
