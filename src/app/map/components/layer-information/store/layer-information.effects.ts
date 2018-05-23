import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import * as LayerInformationActions from './layer-information.actions';
import {map, switchMap} from 'rxjs/operators';
import {LayerInformationActionTypes, SetSelectedLayerId} from './layer-information.actions';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class LayerInformationEffects {
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
