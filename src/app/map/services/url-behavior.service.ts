/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {ActionsSubject, Store} from '@ngrx/store';
import {AddLayer, DeleteLayer, LayerActionTypes} from '@app/map/store/actions/layer.actions';
import * as fromBehaviorActions from '@app/map/store/actions/behavior.actions';
import {Injectable} from '@angular/core';
import {BehaviorHandlerFactory} from '@app/map/utils';
import {filter, take} from 'rxjs/operators';
import {cloneDeep} from 'lodash';
import {MapState} from '@app/map/store';
import {selectBehaviorState} from '@app/map/store/selectors/behavior.selectors';
import { MapService } from '@app/map/utils/open-layers';

@Injectable()
export class UrlBehaviorService {
  constructor(private store: Store<MapState>, private actionsSubject: ActionsSubject, private behaviorHandlerFactory: BehaviorHandlerFactory) {
    this.onLayerAddInitBehaviors();
    this.onLayerDeleteCleanBehaviors();
  }

  onLayerAddInitBehaviors() {
    this.actionsSubject.pipe(filter((action) => {
        return action.type === LayerActionTypes.ADD_LAYER;
      })
    ).subscribe((action: AddLayer) => {
      const layer = cloneDeep(action.payload);
      if (layer.urlBehaviors != null) {
        layer.urlBehaviors.forEach((behavior) => {
          this.store.select(selectBehaviorState).pipe(take(1)).subscribe((state) => {
            if (!state.behaviors.some(b => b.uniqueId === behavior.uniqueId)) {
              const bH = this.behaviorHandlerFactory.getBehaviorHandler(behavior.handler);
              this.store.dispatch(new fromBehaviorActions.AddBehavior(behavior));
              bH.init(cloneDeep(behavior));
            }
          });
        });
      }
    });
  }

  onLayerDeleteCleanBehaviors() {
    this.actionsSubject.pipe(filter((action) => {
        return action.type === LayerActionTypes.DELETE_LAYER;
      })
    ).subscribe((action: DeleteLayer) => {
      const layerUniqueId = action.payload;
      this.store.select(selectBehaviorState).pipe(take(1)).subscribe((behaviorState) => {
        behaviorState.behaviors.forEach((behavior) => {
          if (behavior.layerUniqueId === layerUniqueId) {
            const bH = this.behaviorHandlerFactory.getBehaviorHandler(behavior.handler);
            bH.clean(behavior);
          }
        });
      });
    });
  }
}
