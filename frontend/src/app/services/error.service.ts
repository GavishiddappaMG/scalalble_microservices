import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ErrorMessage {
  type?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  error = new Subject<ErrorMessage>();

  thorwError(message: string) {
    this.error.next({ type: 'error', message: message});
  }
}
