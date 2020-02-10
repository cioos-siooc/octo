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

@Injectable()
export class LayerInformationEffects {
  @Effect()
  fetchLayerInformation = this.actions$
    .ofType<FetchLayerInformation>(LayerInformationActionTypes.FETCH_LAYER_INFORMATION)
    .pipe(switchMap((action: FetchLayerInformation) => {
      return this.httpClient.get(`${environment.mapapiUrl}/layers/${action.payload}/getLayerInformation`,
        {responseType: 'text'}
      ).pipe(map((html) => {
        return new LayerInformationActions.SetLayerInformation({
          layerId: action.payload,
          html: html
        });
      }));
    }));

  constructor(private actions$: Actions, private httpClient: HttpClient) {
  }
}
