import {Actions, Effect} from "@ngrx/effects";
import 'rxjs/operator/map'
import 'rxjs/operator/mergeMap'
import {HttpClient} from "@angular/common/http"
import {Injectable} from "@angular/core";
import * as layerActions from "./layer.actions"
import {Layer} from "../../shared/layer.model";

@Injectable()
export class LayerEffects {

  @Effect()
  recipeFetch = this.actions$
  .ofType(layerActions.FETCH_LAYER)
  .mergeMap((action: layerActions.FetchLayer) => {
    return this.httpClient.get<Layer>(`http://132.215.33.56:8080/mapapi/api/layers/${action.payload}`)
  })
  .map(
    (layer) => {
      console.log(layer);
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
