import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/operator/map';
import 'rxjs/operator/mergeMap';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as layerActions from './layer.actions';
import {Layer} from '../../shared/layer.model';
import {environment} from '../../../environments/environment';
import {ClientPresentation} from '../../shared/client-presentation.model';

@Injectable()
export class LayerEffects {

  @Effect()
  layerFetch = this.actions$
    .ofType(layerActions.FETCH_LAYER)
    .mergeMap((action: layerActions.FetchLayer) => {
      return this.httpClient.get<Layer>(`${environment.mapapiUrl}/layers/${action.payload.layerId}`).map(
        (layer) => {
          layer.uniqueId = action.payload.uniqueId;
          return layer;
        }
      );
    })
    .map(
      (layer) => {
        return {
          type: layerActions.FETCH_CLIENT_PRESENTATIONS,
          payload: layer
        };
      }
    );

  @Effect()
  clientPresentationsFetch = this.actions$
    .ofType(layerActions.FETCH_CLIENT_PRESENTATIONS)
    .mergeMap((action: layerActions.FetchClientPresentations) => {
      return this.httpClient.get<ClientPresentation[]>(`${environment.mapapiUrl}/layers/${action.payload.id}/client-presentations`).map(
        (clientPresentations) => {
          // Add clientPresentations to the layer and set the default as the current one
          action.payload.currentClientPresentation = clientPresentations.filter((cp: ClientPresentation) => {
            return cp.isDefault;
          })[0];
          action.payload.clientPresentations = clientPresentations;
          return action.payload;
        }
      );
    })
    .map(
      (layer) => {
        return {
          type: layerActions.ADD_LAYER,
          payload: layer
        };
      }
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {
  }
}
