import { StoreState } from './../reducers/index';
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { Store } from '@ngrx/store';
import { BehaviorActionTypes } from './../actions/behavior.actions';
import { UpdateBehavior} from '@app/map/store';
import { Injectable } from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';
import { UrlParametersUtil } from '@app/map/utils/url-parameters.util';
import * as moment from 'moment';
import * as fromLayerActions from '@app/map/store/actions/layer.actions';

/**
 * Side effects for the behavior reducer
 * 
 * @export
 * @class BehaviorEffects
 */
@Injectable()
export class BehaviorEffects {
    /**
     * Reducer side effect which synchronizes changes between the behavior reducer
     *  and their corresponding urlParamters in the layer reducer
     * 
     *  ex: a layer has a time behavior which is controlled by a UI element.
     *      This effect ensures that changes to the behavior are added to the corresponding
     *      layer's urlParameters so that they are included in the URL
     *
     * @memberof BehaviorEffects
     */
    @Effect()
    updateUrlParameters = this.actions$
    .ofType<UpdateBehavior>(BehaviorActionTypes.UPDATE_BEHAVIOR)
    .pipe(
        withLatestFrom(this.store$),
        map(([action, store]) => {
            const layerStateCopy = [...store.map.layer.layers];
            const layer = layerStateCopy.find(l => l.id === action.payload.layerId);
            let newLayer = layer;
            if (action.payload.currentDate) {
                const tempDate = {...action.payload.currentDate};
                tempDate.month -= 1;
                const date = moment(tempDate).format(action.payload.options.format);
                newLayer = {
                    ...layer,
                    urlParameters: UrlParametersUtil.addUrlParameter(layer.urlParameters, action.payload.parameterName, date)
                };
            }
            return new fromLayerActions.UpdateLayer(newLayer);
    }));

    constructor(private actions$: Actions, private store$: Store<StoreState>) {}
}
