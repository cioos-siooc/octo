/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {BehaviorHandler} from '@app/map/utils';
import {Store} from '@ngrx/store';
import {MapState, selectLayerState} from '@app/map/store';
import * as fromBehaviorActions from '@app/map/store/actions/behavior.actions';
import {take} from 'rxjs/operators';
import {cloneDeep} from 'lodash';
import * as fromLayerActions from '@app/map/store/actions/layer.actions';
import {UrlParametersUtil} from '@app/map/utils/url-parameters.util';

export class EnumHandler implements BehaviorHandler {
  type = 'enum';

  constructor(private store: Store<MapState>) {
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
      const layerStateCopy = cloneDeep(layerState);
      const layer = layerStateCopy.layers.find(l => l.uniqueId === behavior.layerUniqueId);
      layer.urlParameters = UrlParametersUtil.addUrlParameter(layer.urlParameters, behavior.parameterName,
        behavior.currentValue);
      this.store.dispatch(new fromBehaviorActions.UpdateBehavior(behavior));
      this.store.dispatch(new fromLayerActions.UpdateLayer(layer));
    });
  }
}
