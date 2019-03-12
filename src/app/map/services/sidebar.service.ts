import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarCollaped = new Subject();

  constructor() { }

  setSidebarStatus(status: boolean) {
    this.sidebarCollaped.next(status);
  }

  getSidebarStatus(): Observable<any> {
    return this.sidebarCollaped.asObservable();
  }
}
