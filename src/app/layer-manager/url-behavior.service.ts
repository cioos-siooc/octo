import {ActionsSubject, Store} from '@ngrx/store';
import * as fromLayerActions from '../map/store/layer.actions';
import * as fromApp from '../store/app.reducers';
import * as fromBehaviorActions from './store/behavior.actions';
import * as moment from 'moment';
import {Injectable} from '@angular/core';

@Injectable()
export class UrlBehaviorService {
  constructor(private store: Store<fromApp.AppState>, private actionsSubject: ActionsSubject) {
    this.onLayerAddInitBehaviors();
    this.onLayerDeleteCleanBehaviors();
  }

  onLayerAddInitBehaviors() {
    this.actionsSubject.filter((action) => {
      return action.type === fromLayerActions.ADD_LAYER;
    })
      .subscribe((action: fromLayerActions.AddLayer) => {
        const layer = action.payload;
        if (layer.urlBehaviors != null) {
          layer.urlBehaviors.forEach((behavior) => {
            this.store.select('behavior').take(1).subscribe((state) => {
              if (!state.behaviors.some(b => b.uniqueId === behavior.uniqueId)) {
                // TODO: factory.getBehaviorInitializer().init(behavior);
                this.store.dispatch(new fromBehaviorActions.AddBehavior(behavior));
                this.init(behavior);
              }
            });
          });
        }
      });
  }

  onLayerDeleteCleanBehaviors() {
    this.actionsSubject.filter((action) => {
      return action.type === fromLayerActions.DELETE_LAYER;
    })
      .subscribe((action: fromLayerActions.DeleteLayer) => {
        const layerUniqueId = action.payload;
        this.store.select('behavior').take(1).subscribe((behaviorState) => {
          behaviorState.behaviors.forEach((behavior) => {
            if (behavior.layerUniqueId === layerUniqueId) {
              clearInterval(behavior.interval);
              this.store.dispatch(new fromBehaviorActions.DeleteBehavior(behavior.uniqueId));
            }

          });
        });
      });
  }

  init(behavior) {
    this.store.select('layer').take(1).subscribe((state) => {
      const options = behavior.options;
      const layer = state.layers.find(l => l.uniqueId === behavior.layerUniqueId);
      if (options.isNowSupported) {
        // TODO: set behavior.state isNowEnabled= true?
        this.updateDateToNow(behavior, layer);
        const interval = setInterval(() => {
          this.store.select('layer').take(1).subscribe((layerState) => {
            this.store.select('behavior').take(1).subscribe((behaviorState) => {
              // Use the latest values of layer and behavior
              const lay = layerState.layers.find(l => l.uniqueId === layer.uniqueId);
              const beh = behaviorState.behaviors.find(b => b.uniqueId === behavior.uniqueId);
              beh.interval = interval;
              this.updateDateToNow(beh, lay);
            });
          });
        }, options.nowDelay * 60 * 1000);
      }
    });
  }

  updateDateToNow(behavior, layer) {
    behavior.parameterValue = moment(new Date()).format(behavior.options.format);
    this.store.dispatch(new fromBehaviorActions.UpdateBehavior(behavior));
    layer.urlParameters = this.addUrlParameter(layer.urlParameters, behavior.parameterName, behavior.parameterValue);
    this.store.dispatch(new fromLayerActions.UpdateLayer(layer));
  }

  addUrlParameter(urlParameters, paramName, paramValue) {
    if (urlParameters == null) {
      urlParameters = [];
    } else {
      urlParameters = urlParameters.filter((urlParam) => {
        return Object.keys(urlParam)[0] !== paramName;
      });
    }
    const urlParameter = {};
    urlParameter[paramName] = paramValue;
    urlParameters.push(urlParameter);
    return urlParameters;
  }
}
