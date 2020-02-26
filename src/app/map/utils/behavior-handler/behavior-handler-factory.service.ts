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
import { DynamicEnumHandler } from '@app/map/utils/behavior-handler/dynamic-enum-handler.util';
import { Injectable } from '@angular/core';

@Injectable()
export class BehaviorHandlerFactory {

  constructor(private store: Store<MapState>, private dynamicEnumHandler: DynamicEnumHandler) { }

  public getBehaviorHandler(type: string): BehaviorHandler {
    switch (type) {
      case 'time':
        return new TimeHandler(this.store);
      case 'dynamic-enum':
        return this.dynamicEnumHandler;
      default:
        return new EnumHandler(this.store);
    }
  }
}
