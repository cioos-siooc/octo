/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { SetLayerDescription, AddLayer } from './../actions/layer.actions';

import {Actions, Effect} from '@ngrx/effects';


import {catchError, map, mergeMap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Layer} from '@app/shared/models';
import {LayerDescription} from '@app/shared/models/layer-description.model';
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
  FetchLayerDescription,
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
    }), mergeMap(
      (layer) => {
        return [
          new FetchClickStrategy(layer)
        ];
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
        (layer) => new FetchLayerDescription(layer)
      ));

  @Effect()
  layerDescriptionFetch = this.actions$
      .ofType<FetchLayerDescription>(LayerActionTypes.FETCH_LAYER_DESCRIPTION)
      .pipe(mergeMap((action: FetchLayerDescription) => {
        return this.httpClient.get<LayerDescription>
        (`${environment.mapapiUrl}/layers/${action.payload.id}/layer-descriptions`).pipe(
          map(
            (layerDescription) => {
              const newPayload = {...action.payload};
              newPayload.description = layerDescription;
              return newPayload;
            }
          ), catchError((err: HttpErrorResponse) => {
            return of(action.payload);
          }),
          map((layer: Layer) => new AddLayer(layer))
        );
      }));

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {
  }
}
