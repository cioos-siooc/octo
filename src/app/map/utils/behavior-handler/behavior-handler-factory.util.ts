import {TimeHandler} from './time-handler.util';
import {BehaviorHandler} from './behavior-handler.util';
import {Store} from '@ngrx/store';
import {MapState} from '../../store/reducers/map.reducers';

export class BehaviorHandlerFactory {
  public static getBehaviorHandler(type: string, store: Store<MapState>): BehaviorHandler {
    switch (type) {
      case 'time':
        return new TimeHandler(store);
      default:
        return null;
    }
  }
}
