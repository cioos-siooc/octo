import {BehaviorHandler} from './behavior-handler.util';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as moment from 'moment';
import * as fromBehaviorActions from '../store/behavior.actions';
import * as fromLayerActions from '../../map/store/layer.actions';

export class TimeHandler implements BehaviorHandler {
  type = 'time';

  constructor(private store: Store<fromApp.AppState>) {
  }

  init(behavior: any) {
    this.store.select('layer').take(1).subscribe((state) => {
      const options = behavior.options;
      const layer = state.layers.find(l => l.uniqueId === behavior.layerUniqueId);
      if (options.isNowSupported) {
        behavior.isNowEnabled = true;
        behavior.interval = this.setNowInterval(behavior);
        this.updateDateToNow(behavior, layer);
      }
    });
  }

  setNowInterval(behavior) {
    const interval = setInterval(() => {
      this.store.select('layer').take(1).subscribe((layerState) => {
        this.store.select('behavior').take(1).subscribe((behaviorState) => {
          // Use the latest values of layer and behavior
          const beh = behaviorState.behaviors.find(b => b.uniqueId === behavior.uniqueId);
          const lay = layerState.layers.find(l => l.uniqueId === beh.layerUniqueId);
          this.updateDateToNow(beh, lay);
        });
      });
    }, behavior.options.nowDelay * 60 * 1000);
    return interval;
  }

  updateDateToNow(behavior, layer) {
    const newDate = moment(new Date()).format(behavior.options.format);
    layer.urlParameters = this.addUrlParameter(layer.urlParameters, behavior.parameterName, newDate);
    this.store.dispatch(new fromLayerActions.UpdateLayer(layer));
  }

  toggleNow(behavior) {
    if (behavior.isNowEnabled && behavior.interval != null) {
      clearInterval(behavior.interval);
      behavior.interval = null;
      behavior.isNowEnabled = !behavior.isNowEnabled;
      this.store.dispatch(new fromBehaviorActions.UpdateBehavior(behavior));
    } else {
      behavior.isNowEnabled = !behavior.isNowEnabled;
      this.store.select('layer').take(1).subscribe((layerState) => {
        const layer = layerState.layers.find(l => l.uniqueId = behavior.layerUniqueId);
        behavior.interval = this.setNowInterval(behavior);
        this.updateDateToNow(behavior, layer);
      });
    }
  }

  clean(behavior: any) {
    clearInterval(behavior.interval);
    this.store.dispatch(new fromBehaviorActions.DeleteBehavior(behavior.uniqueId));
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
