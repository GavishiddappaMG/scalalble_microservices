import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  changeSiberStatus = new Subject();
  themeStatus = new Subject();

  constructor() { }

  toggleFiller(): void {
    this.changeSiberStatus.next();
  }
}
