import {ActionsSubject, Store} from '@ngrx/store';
import {AddLayer, DeleteLayer, LayerActionTypes} from '../store/actions/layer.actions';
import * as fromBehaviorActions from '../store/actions/behavior.actions';
import {Injectable} from '@angular/core';
import {BehaviorHandlerFactory} from '../utils/behavior-handler/behavior-handler-factory.util';
import {filter, take} from 'rxjs/operators';
import {cloneDeep} from 'lodash';
import {MapState, selectBehaviorState} from '../store/reducers/map.reducers';

@Injectable()
export class UrlBehaviorService {
  constructor(private store: Store<MapState>, private actionsSubject: ActionsSubject) {
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
              const bH = BehaviorHandlerFactory.getBehaviorHandler(behavior.handler, this.store);
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
            const bH = BehaviorHandlerFactory.getBehaviorHandler(behavior.handler, this.store);
            bH.clean(behavior);
          }
        });
      });
    });
  }
}
