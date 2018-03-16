import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {environment} from '../../../environments/environment';
import * as LayerInformationActions from './layer-information.actions';

@Injectable()
export class LayerInformationEffects {
  @Effect()
  fetchLayerInformation = this.actions$
    .ofType(LayerInformationActions.SET_SELECTED_LAYER_ID)
    .switchMap((action: LayerInformationActions.SetSelectedLayerId) => {
      return this.httpClient.get(`${environment.mapapiUrl}/layers/${action.payload}/getLayerInformation`,
        {headers: {'Content-Type': 'text/html'}, responseType: 'text'}
      ).map(layerInformation => {
        return new LayerInformationActions.SetLayerInformation(layerInformation);
      });
    });

  constructor(private actions$: Actions, private httpClient: HttpClient) {
  }
}
