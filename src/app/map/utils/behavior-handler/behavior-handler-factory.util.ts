/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {TimeHandler} from './time-handler.util';
import {BehaviorHandler} from './behavior-handler.util';
import {Store} from '@ngrx/store';
import {MapState} from '../../store';
import {EnumHandler} from '@app/map/utils/behavior-handler/enum-handler.util';

export class BehaviorHandlerFactory {
  public static getBehaviorHandler(type: string, store: Store<MapState>): BehaviorHandler {
    switch (type) {
      case 'time':
        return new TimeHandler(store);
      default:
        return new EnumHandler(store);
    }
  }
}
