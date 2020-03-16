/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}
)
export class LoadingService {
  // Possibility to create an interface if the service had much more attributes
  private showCount = 0;
  private loadingSubject = new Subject();

  constructor() { }

  show() {
    this.showCount += 1;
    this.loadingSubject.next(true);
  }

  hide() {
    this.showCount -= 1;
    if (this.showCount <= 0) {
      this.showCount = 0;
      this.loadingSubject.next(false);
    }
  }

  getStatus(): Observable<any> {
    return this.loadingSubject.asObservable();
  }
}
