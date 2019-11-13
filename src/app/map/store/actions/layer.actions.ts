/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Action} from '@ngrx/store';
import {Layer} from '@app/shared/models';
import {ClientPresentation} from '@app/shared/models';
import { LayerDescription } from '@app/shared/models/layer-description.model';

export enum LayerActionTypes {
  FETCH_LAYER = '[Layer] Fetch',
  FETCH_LAYER_DESCRIPTION = '[Layer] Fetch layer description',
  FETCH_CLIENT_PRESENTATIONS = '[Layer] Fetch client presentations',
  ADD_LAYER = '[Layer] Add',
  DELETE_LAYER = '[Layer] Delete',
  UPDATE_LAYER = '[Layer] Update',
  MOVE_UP_LAYER = '[Layer] Move up',
  MOVE_DOWN_LAYER = '[Layer] Move down',
  SET_LAYER_DESCRIPTION = '[Layer] Set layer description',
  SET_CLIENT_PRESENTATION = '[Layer] Set client presentation',
  SET_LAYER_POSITION = '[Layer] Set new position',
  FETCH_CLICK_STRATEGY = '[Layer] Fetch click strategy',
  FETCH_CLICK_FORMATTER = '[Layer] Fetch click formatter',
}

export class FetchLayer implements Action {
  readonly type = LayerActionTypes.FETCH_LAYER;

  constructor(public payload: { layerId: number, uniqueId: string, layerGroupId?: number }) {
  }
}

export class FetchLayerDescription implements Action {
  readonly type = LayerActionTypes.FETCH_LAYER_DESCRIPTION;

  constructor(public payload: Layer) {
  }
}

export class FetchClientPresentations implements Action {
  readonly type = LayerActionTypes.FETCH_CLIENT_PRESENTATIONS;

  constructor(public payload: Layer) {
  }
}

export class AddLayer implements Action {
  readonly type = LayerActionTypes.ADD_LAYER;

  constructor(public payload: Layer) {
  }
}

export class DeleteLayer implements Action {
  readonly type = LayerActionTypes.DELETE_LAYER;

  constructor(public payload: string) {
  }
}

export class UpdateLayer implements Action {
  readonly type = LayerActionTypes.UPDATE_LAYER;

  constructor(public payload: Layer) {
  }
}

export class SetLayerDescription implements Action {
  readonly type = LayerActionTypes.SET_LAYER_DESCRIPTION;

  constructor(public payload: {
    layerId: number,
    layerDescription: LayerDescription
  }) { }
}

export class SetClientPresentation implements Action {
  readonly type = LayerActionTypes.SET_CLIENT_PRESENTATION;

  constructor(public payload: { uniqueId: string, clientPresentation: ClientPresentation }) {
  }
}

export class SetLayerPosition implements Action {
  readonly type = LayerActionTypes.SET_LAYER_POSITION;

  constructor (public payload: {layerId: string, newLayerPosition: number}) {}
}

export class FetchClickStrategy implements Action {
  readonly type = LayerActionTypes.FETCH_CLICK_STRATEGY;

  constructor(public payload: Layer) {
  }
}
export class MoveUpLayer implements Action {
  readonly type = LayerActionTypes.MOVE_UP_LAYER;

  constructor(public payload: string) {
  }
}
export class MoveDownLayer implements Action {
  readonly type = LayerActionTypes.MOVE_DOWN_LAYER;

  constructor(public payload: string) {
  }
}
export class FetchClickFormatter implements Action {
  readonly type = LayerActionTypes.FETCH_CLICK_FORMATTER;

  constructor(public payload: Layer) {
  }
}


export type LayerActionsUnion =
  FetchLayer |
  FetchLayerDescription |
  AddLayer |
  DeleteLayer |
  FetchClientPresentations |
  FetchClickStrategy |
  FetchClickFormatter |
  SetLayerDescription |
  SetClientPresentation |
  SetLayerPosition |
  MoveUpLayer |
  MoveDownLayer |
  UpdateLayer;
