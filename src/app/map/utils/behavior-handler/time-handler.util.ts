/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {BehaviorHandler} from './behavior-handler.util';
import {Store} from '@ngrx/store';
import * as moment from 'moment';
import * as fromBehaviorActions from '@app/map/store/actions/behavior.actions';
import * as fromLayerActions from '@app/map/store/actions/layer.actions';
import {take} from 'rxjs/operators';
import {MapState} from '@app/map/store';
import {selectBehaviorState} from '@app/map/store';
import {selectLayerState} from '@app/map/store';
import {UrlParametersUtil} from '@app/map/utils/url-parameters.util';

export class TimeHandler implements BehaviorHandler {
  type = 'time';

  constructor(private store: Store<MapState>) {
  }

  init(behavior: any) {
    this.store.select(selectLayerState).pipe(take(1)).subscribe((layerState) => {
      const layerStateCopy = {...layerState};
      const options = behavior.options;
      const layer = layerStateCopy.layers.find(l => l.uniqueId === behavior.layerUniqueId);
      if (options.isNowSupported) {
        behavior.isNowEnabled = true;
        behavior.interval = this.setNowInterval(behavior);
        this.updateDateToNow(behavior, layer);
        this.updateBehaviorDateTime(behavior);
      }
    });
  }

  setNowInterval(behavior) {
    const interval = setInterval(() => {
      this.store.select(selectLayerState).pipe(take(1)).subscribe((layerState) => {
        this.store.select(selectBehaviorState).pipe(take(1)).subscribe((behaviorState) => {
          const layerStateCopy = {...layerState};
          const behaviorStateCopy = {...behaviorState};
          // Use the latest values of layer and behavior
          const beh = behaviorStateCopy.behaviors.find(b => b.uniqueId === behavior.uniqueId);
          const lay = layerStateCopy.layers.find(l => l.uniqueId === beh.layerUniqueId);
          this.updateDateToNow(beh, lay);
        });
      });
    }, behavior.options.nowDelay * 60 * 1000);
    return interval;
  }

  updateDateToNow(behavior, layer) {
    const newDate = moment(new Date());
    layer.urlParameters = UrlParametersUtil.addUrlParameter(
      layer.urlParameters,
      behavior.parameterName,
      newDate.format(behavior.options.format)
    );
    this.store.dispatch(new fromLayerActions.UpdateLayer(layer));
    const updatedBehavior = {
      ...behavior,
      currentDate: {year: newDate.year(), month: newDate.month() + 1, day: newDate.date()}
    };
    this.updateBehaviorDateTime(behavior);
  }

  toggleNow(behavior) {
    if (behavior.isNowEnabled && behavior.interval != null) {
      clearInterval(behavior.interval);
      behavior.interval = null;
      behavior.isNowEnabled = !behavior.isNowEnabled;
      this.updateBehaviorDateTime(behavior);
    } else {
      behavior.isNowEnabled = !behavior.isNowEnabled;
      this.store.select(selectLayerState).pipe(take(1)).subscribe((layerState) => {
        const layerStateCopy = {...layerState};
        const layer = layerStateCopy.layers.find(l => l.uniqueId === behavior.layerUniqueId);
        behavior.interval = this.setNowInterval(behavior);
        behavior.currentDate = null;
        this.updateBehaviorDateTime(behavior);
        this.updateDateToNow(behavior, layer);
      });
    }
  }

  clean(behavior: any) {
    clearInterval(behavior.interval);
    this.store.dispatch(new fromBehaviorActions.DeleteBehavior(behavior.uniqueId));
  }

  setNowOff(behavior) {
    if (behavior.interval != null) {
      clearInterval(behavior.interval);
      behavior.interval = null;
    }
    behavior.isNowEnabled = false;
    this.updateBehaviorDateTime(behavior);
  }

  updateBehaviorDateTime(behavior) {
    this.store.dispatch(new fromBehaviorActions.UpdateBehavior(behavior));
  }

  updateLayerDateTime(behavior) {
    this.store.select(selectLayerState).pipe(take(1)).subscribe((layerState) => {
      const layerStateCopy = {...layerState};
      const layer = layerStateCopy.layers.find(l => l.uniqueId === behavior.layerUniqueId);
      const tempDate = {...behavior.currentDate};
      tempDate.month -= 1;
      const date = moment(tempDate).format(behavior.options.format);
      layer.urlParameters = UrlParametersUtil.addUrlParameter(layer.urlParameters, behavior.parameterName, date);
      this.store.dispatch(new fromLayerActions.UpdateLayer(layer));
    });
  }
}
