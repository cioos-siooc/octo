import {uniqueId} from 'lodash';

import * as layerActions from '../map/store/layer.actions';

export default class ActivateLayer {
  static activateLayer(layerId: number, store) {
    const genUniqueId: string = uniqueId();
    store.dispatch(new layerActions.FetchLayer({
      layerId: layerId,
      uniqueId: genUniqueId
    }));
    return genUniqueId;
  }
}
