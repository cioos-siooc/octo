import {ActionsSubject, Store} from '@ngrx/store';
import * as fromLayerActions from '../map/store/layer.actions';
import * as fromApp from '../store/app.reducers';
import * as fromBehaviorActions from './store/behavior.actions';
import {Injectable} from '@angular/core';
import {BehaviorHandlerFactory} from './behavior-handler/behavior-handler-factory.util';
import {filter, take} from 'rxjs/operators';

@Injectable()
export class UrlBehaviorService {
  constructor(private store: Store<fromApp.AppState>, private actionsSubject: ActionsSubject) {
    this.onLayerAddInitBehaviors();
    this.onLayerDeleteCleanBehaviors();
  }

  onLayerAddInitBehaviors() {
    this.actionsSubject.pipe(filter((action) => {
      return action.type === fromLayerActions.ADD_LAYER;
    })
    ).subscribe((action: fromLayerActions.AddLayer) => {
        const layer = action.payload;
        if (layer.urlBehaviors != null) {
          layer.urlBehaviors.forEach((behavior) => {
            this.store.select('behavior').pipe(take(1)).subscribe((state) => {
              if (!state.behaviors.some(b => b.uniqueId === behavior.uniqueId)) {
                const bH = BehaviorHandlerFactory.getBehaviorHandler(behavior.handler, this.store);
                this.store.dispatch(new fromBehaviorActions.AddBehavior(behavior));
                bH.init(behavior);
              }
            });
          });
        }
      });
  }

  onLayerDeleteCleanBehaviors() {
    this.actionsSubject.pipe(filter((action) => {
      return action.type === fromLayerActions.DELETE_LAYER;
    })
    ).subscribe((action: fromLayerActions.DeleteLayer) => {
        const layerUniqueId = action.payload;
        this.store.select('behavior').pipe(take(1)).subscribe((behaviorState) => {
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
