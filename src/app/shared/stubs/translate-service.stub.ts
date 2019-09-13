/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { of } from 'rxjs';

export class TranslateServiceStub {
  public get(key: any): any {
    if (key === 'language') {
      return of('en');
    } else {
      return of(key);
    }
  }
}
