import {Actions, Effect} from '@ngrx/effects';


import {catchError, map, mergeMap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Layer} from '@app/shared/models';
import {environment} from '@env/environment';
import {ClientPresentation} from '@app/shared/models';
import {ClickStrategy} from '@app/shared/models';
import {ClickFormatterInfo} from '@app/shared/models';
import {uniqueId} from 'lodash';
import {of} from 'rxjs/internal/observable/of';
import {cloneDeep} from 'lodash';
import {
  FetchClickFormatter,
  FetchClickStrategy,
  FetchClientPresentations,
  FetchLayer,
  LayerActionTypes
} from '../actions/layer.actions';

@Injectable()
export class LayerEffects {

  @Effect()
  layerFetch = this.actions$
    .ofType<FetchLayer>(LayerActionTypes.FETCH_LAYER)
    .pipe(mergeMap((action: FetchLayer) => {
      return this.httpClient.get<Layer>(`${environment.mapapiUrl}/layers/${action.payload.layerId}`).pipe(map(
        (layer) => {
          layer.uniqueId = action.payload.uniqueId;
          if (layer.urlBehaviors != null) {
            layer.urlBehaviors.forEach((behavior) => {
              behavior.uniqueId = uniqueId();
              behavior.layerUniqueId = layer.uniqueId;
            });
          }
          return layer;
        }
      ));
    }), map(
      (layer) => {
        return {
          type: LayerActionTypes.FETCH_CLICK_STRATEGY,
          payload: layer
        };
      }
    ));

  @Effect()
  clickStrategyFetch = this.actions$
    .ofType<FetchClickStrategy>(LayerActionTypes.FETCH_CLICK_STRATEGY)
    .pipe(mergeMap((action: FetchClickStrategy) => {
        return this.httpClient.get<ClickStrategy>(`${environment.mapapiUrl}/layers/${action.payload.id}/click-strategies`).pipe(
          map(
            (clickStrategy) => {
              const newAction = cloneDeep(action);
              newAction.payload.clickStrategy = clickStrategy;
              return newAction.payload;
            }
          ), catchError((err: HttpErrorResponse) => {
            return of(action.payload);
          }));
      })
      , map(
        (layer) => {
          return {
            type: LayerActionTypes.FETCH_CLICK_FORMATTER,
            payload: layer
          };
        }
      ));
  @Effect()
  clickFormatterFetch = this.actions$
    .ofType<FetchClickFormatter>(LayerActionTypes.FETCH_CLICK_FORMATTER)
    .pipe(mergeMap((action: FetchClickFormatter) => {
        return this.httpClient.get<ClickFormatterInfo>(`${environment.mapapiUrl}/layers/${action.payload.id}/click-formatters`).pipe(
          map(
            (clickFormatterInfo) => {
              const newAction = cloneDeep(action);
              newAction.payload.clickFormatterInfo = clickFormatterInfo;
              return newAction.payload;
            }
          ), catchError((err: HttpErrorResponse) => {
            return of(action.payload);
          }));
      })
      , map(
        (layer) => {
          return {
            type: LayerActionTypes.FETCH_CLIENT_PRESENTATIONS,
            payload: layer
          };
        }
      ));
  @Effect()
  clientPresentationsFetch = this.actions$
    .ofType<FetchClientPresentations>(LayerActionTypes.FETCH_CLIENT_PRESENTATIONS)
    .pipe(mergeMap((action: FetchClientPresentations) => {
        return this.httpClient.get<ClientPresentation[]>(
          `${environment.mapapiUrl}/layers/${action.payload.id}/client-presentations`).pipe(map(
          (clientPresentations) => {
            // Add clientPresentations to the layer and set the default as the current one
            const newPayload = {...action.payload};
            newPayload.currentClientPresentation = clientPresentations.find((cp: ClientPresentation) => {
              return cp.isDefault;
            });
            newPayload.clientPresentations = clientPresentations;
            return newPayload;
          }
        ));
      })
      , map(
        (layer) => {
          return {
            type: LayerActionTypes.ADD_LAYER,
            payload: layer
          };
        }
      ));

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {
  }
}
