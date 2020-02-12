/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import * as LayerInformationActions from '../actions/layer-information.actions';
import {map, switchMap} from 'rxjs/operators';
import {LayerInformationActionTypes, SetSelectedLayerId} from '../actions/layer-information.actions';
import {environment} from '@env/environment';

/**
 * Side effects for the LayerInformation reducer
 *
 * @export
 * @class LayerInformationEffects
 */
@Injectable()
export class LayerInformationEffects {
  /**
   * Fetches LayerInformation from OctoPi based on the layerId given in the payload
   *
   * @memberof LayerInformationEffects
   */
  @Effect()
  fetchLayerInformation = this.actions$
    .ofType<SetSelectedLayerId>(LayerInformationActionTypes.SET_SELECTED_LAYER_ID)
    .pipe(switchMap((action: LayerInformationActions.SetSelectedLayerId) => {
      return this.httpClient.get(`${environment.mapapiUrl}/layers/${action.payload}/getLayerInformation`,
        {responseType: 'text'}
      ).pipe(map(layerInformation => {
        return new LayerInformationActions.SetLayerInformation(layerInformation);
      }));
    }));

  constructor(private actions$: Actions, private httpClient: HttpClient) {
  }
}
