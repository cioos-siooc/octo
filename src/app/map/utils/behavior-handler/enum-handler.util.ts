/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {BehaviorHandler} from '@app/map/utils';
import {Store} from '@ngrx/store';
import {MapState, selectLayerState} from '@app/map/store';
import * as fromBehaviorActions from '@app/map/store/actions/behavior.actions';
import * as fromLayerActions from '@app/map/store/actions/layer.actions';
import {take} from 'rxjs/operators';
import {UrlParametersUtil} from '@app/map/utils/url-parameters.util';

export class EnumHandler implements BehaviorHandler {
  type = 'enum';

  constructor(protected store: Store<MapState>) {
  }

  init(behavior: any) {
    const defaultPossibility = behavior.possibilities.find(p => p.isDefault === true);
    behavior.currentValue = defaultPossibility.value;
    this.updateParameter(behavior);
  }

  clean(behavior: any) {
    this.store.dispatch(new fromBehaviorActions.DeleteBehavior(behavior.uniqueId));
  }

  updateParameter(behavior) {
    this.store.select(selectLayerState).pipe(take(1)).subscribe((layerState) => {
      const layerStateCopy = {...layerState};
      const layer = layerStateCopy.layers.find(l => l.uniqueId === behavior.layerUniqueId);

      // Handles the case where a behavior has a different parameterName in the URL than it does in the data(ie CQL filters)
      let parameterName = undefined;
      if (!(typeof(behavior.urlParameterName) === 'undefined')) {
        parameterName = behavior.urlParameterName;
      } else {
        parameterName = behavior.parameterName;
      }

      // Handles the case where the value needs to be in quotes(ie CQL filters on string parameters)
      let currentValue = behavior.currentValue;
      if (behavior.valueInQuotes) {
        currentValue = "'" + currentValue + "'";
      }
      const urlParameters = UrlParametersUtil.addUrlParameter(layer.urlParameters, parameterName,
        currentValue);
      const updatedLayer = {
        ...layer,
        urlParameters: urlParameters
      };
      this.store.dispatch(new fromLayerActions.UpdateLayer(updatedLayer));
      this.store.dispatch(new fromBehaviorActions.UpdateBehavior(behavior));
    });
  }
}
