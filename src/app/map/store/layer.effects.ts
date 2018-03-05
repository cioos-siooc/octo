import {Actions, Effect} from "@ngrx/effects";
import 'rxjs/operator/map'
import 'rxjs/operator/mergeMap'
import {HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core";
import * as layerActions from "./layer.actions"
import {Layer} from "../../shared/layer.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class LayerEffects {

  @Effect()
  recipeFetch = this.actions$
  .ofType(layerActions.FETCH_LAYER)
  .mergeMap((action: layerActions.FetchLayer) => {
    return this.httpClient.get<Layer>(`${environment.mapapiUrl}/layers/${action.payload}`)
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
