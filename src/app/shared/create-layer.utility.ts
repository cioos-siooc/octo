import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { uniqueId } from 'lodash';

import * as layerActions from '../map/store/layer.actions';
import * as fromApp from '../store/app.reducers';

export default class CreateLayer {
    static createLayer(layerId: number, store) {
        const genUniqueId: string = uniqueId();
        store.dispatch(new layerActions.FetchLayer({
            layerId: layerId,
            uniqueId: genUniqueId
        }));
        return genUniqueId;
    }
}
