import { TimeHandler } from './time-handler.util';
import { BehaviorHandler } from './behavior-handler.util';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';

export class BehaviorHandlerFactory {
  public static getBehaviorHandler(type: string, store: Store<fromApp.AppState>): BehaviorHandler {
    switch (type) {
      case 'time':
        return new TimeHandler(store);
      default:
        return null;
    }
  }
}
