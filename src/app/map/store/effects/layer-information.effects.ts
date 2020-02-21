/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import * as LayerInformationActions from '../actions/layer-information.actions';
import {map, switchMap, flatMap} from 'rxjs/operators';
import {LayerInformationActionTypes, FetchLayerInformation} from '../actions/layer-information.actions';
import {environment} from '@env/environment';
import { Observable, of } from 'rxjs';
import { LayerInformationUrl } from '@app/shared/models/layer-information-url.model';

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
    .ofType<FetchLayerInformation>(LayerInformationActionTypes.FETCH_LAYER_INFORMATION)
    .pipe(switchMap((action: FetchLayerInformation) => {
      return this.httpClient.get<LayerInformationUrl[]>(`${environment.mapapiUrl}/layers/${action.payload}/layer-info`
      ).pipe(map((layerInformationUrls) => {
        return new LayerInformationActions.SetLayerInformation({
          layerId: action.payload,
          urls: layerInformationUrls
        });
      }));
    }));

  constructor(private actions$: Actions, private httpClient: HttpClient) {
  }
}
