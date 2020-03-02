import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}
)
export class LoadingService {
  // Possibility to create an interface if the service had much more attributes
  private loadingSubject = new Subject();

  constructor() { }

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }

  getStatus(): Observable<any> {
    return this.loadingSubject.asObservable();
  }
}
