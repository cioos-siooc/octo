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
  INIT_LAYER_POSITION = '[Layer] Init layer position',
  SET_LAYER_POSITION = '[Layer] Set new position',
  FETCH_CLICK_STRATEGY = '[Layer] Fetch click strategy',
  FETCH_CLICK_FORMATTER = '[Layer] Fetch click formatter',
}

/**
 * Creates an instance of FetchLayer which can be dispatched to the store
 *  FetchLayer triggers an effect chain which requests the layer from OctoPi
 *  as well as all associated metadata
 *
 * @export
 * @class FetchLayer
 * @implements {Action}
 */
export class FetchLayer implements Action {
  readonly type = LayerActionTypes.FETCH_LAYER;

/**
 *Creates an instance of FetchLayer.
* @param {{
    layerId: number,
    uniqueId: string,
    priority: number,
    layerGroupId: number}}
    payload - The id and uniqueId of the layer to be fetched. currently uniqueId is the string version of layerId
* @memberof FetchLayer
*/
  constructor(public payload: {
    layerId: number,
    priority?: number,
    layerGroupId?: number,
  }) { }
}

/**
 * Creates an instance of FetchLayerDescription which can be dispatched to the store
 *  FetchLayerDescription triggers an effect which fetches the layer description from OctoPi
 *
 *  Note: this is included in the FetchLayer effect chain. Not a good idea to use this standalone
 *
 * @export
 * @class FetchLayerDescription
 * @implements {Action}
 */
export class FetchLayerDescription implements Action {
  readonly type = LayerActionTypes.FETCH_LAYER_DESCRIPTION;

  /**
   *Creates an instance of FetchLayerDescription.
   * @param {Layer} payload - The layer whose description should be fetched
   * @memberof FetchLayerDescription
   */
  constructor(public payload: Layer) {
  }
}

/**
 * Creates an instance of FetchClientPresentations which can be dispatched to the store
 *  FetchClientPresentations triggers an effect which fetches the client presentation from OctoPi
 *
 *  Note: this is included in the FetchLayer effect chain. Not a good idea to use this standalone
 *
 * @export
 * @class FetchClientPresentations
 * @implements {Action}
 */
export class FetchClientPresentations implements Action {
  readonly type = LayerActionTypes.FETCH_CLIENT_PRESENTATIONS;

  /**
   *Creates an instance of FetchClientPresentations.
   * @param {Layer} payload - The layer whose client presentations should be fetched
   * @memberof FetchClientPresentations
   */
  constructor(public payload: Layer) {
  }
}

/**
 * Creates an instance of AddLayer which can be dispatched to the store
 *  AddLayer appends a layer to the layer list in the layer reducer
 *
 * @export
 * @class AddLayer
 * @implements {Action}
 */
export class AddLayer implements Action {
  readonly type = LayerActionTypes.ADD_LAYER;

  /**
   *Creates an instance of AddLayer.
   * @param {Layer} payload - The layer to be added to the reducer
   * @memberof AddLayer
   */
  constructor(public payload: Layer) {
  }
}

/**
 * Creates an instance of DeleteLayer which can be dispatched to the store
 *  DeleteLayer removes a layer from the layer list in the layer reducer
 *
 * @export
 * @class DeleteLayer
 * @implements {Action}
 */
export class DeleteLayer implements Action {
  readonly type = LayerActionTypes.DELETE_LAYER;

  /**
   *Creates an instance of DeleteLayer.
   * @param {number} payload - The ID of the layer to be removed, represented as a string
   * @memberof DeleteLayer
   */
  constructor(public payload: number) {
  }
}

/**
 * Creates an instance of UpdateLayer which can be dispatched to the store
 *  UpdateLayer updates a layer in the layer list. The layers are matched based on layer uniqueIds
 *  If the layer is not found in the reducer it is not added
 *
 * @export
 * @class UpdateLayer
 * @implements {Action}
 */
export class UpdateLayer implements Action {
  readonly type = LayerActionTypes.UPDATE_LAYER;

  /**
   *Creates an instance of UpdateLayer.
   * @param {Layer} payload - The new version of the layer to be updated
   * @memberof UpdateLayer
   */
  constructor(public payload: Layer) {
  }
}

/**
 * Creates an instance of SetLayerDescription which can be dispatched to the store
 *  SetLayerDescription sets the description of a layer in the layer reducer
 *
 * @export
 * @class SetLayerDescription
 * @implements {Action}
 */
export class SetLayerDescription implements Action {
  readonly type = LayerActionTypes.SET_LAYER_DESCRIPTION;

  /**
   *Creates an instance of SetLayerDescription.
   * @param {{
   *     layerId: number, - The id of the layer whose description will be updated
   *     layerDescription: LayerDescription - The new description for the layer
   *   }} payload
   * @memberof SetLayerDescription
   */
  constructor(public payload: {
    layerId: number,
    layerDescription: LayerDescription
  }) { }
}

/**
 * Creates an instance of SetClientPresentation which can be dispatched to the store
 *  SetClientPresentation sets the currentClientPresentation for a layer in the layer reducer
 *
 * @export
 * @class SetClientPresentation
 * @implements {Action}
 */
export class SetClientPresentation implements Action {
  readonly type = LayerActionTypes.SET_CLIENT_PRESENTATION;

  /**
   *Creates an instance of SetClientPresentation.
   * @param {{
   *  layerId: number, - The id of the layer whose currentClientPresentation will be updated
   *  clientPresentation: ClientPresentation - The new currentClientPresentation for the layer
   * }} payload
   * @memberof SetClientPresentation
   */
  constructor(public payload: {layerId: number, clientPresentation: ClientPresentation }) {
  }
}

export class InitLayerPosition implements Action {
  readonly type = LayerActionTypes.INIT_LAYER_POSITION;

  constructor (public payload: {layerId: number, alwaysOnTop: boolean}) {}
}

/**
 * Creates an instance of SetLayerPosition which can be dispatched to the store
 *  SetLayerPosition sets the layer's position in the layer list in the layer reducer
 *
 * @export
 * @class SetLayerPosition
 * @implements {Action}
 */
export class SetLayerPosition implements Action {
  readonly type = LayerActionTypes.SET_LAYER_POSITION;

  /**
   *Creates an instance of SetLayerPosition.
   * @param {{
   *  layerId: number, - The id of the layer to be moved represented as a string
   *  newLayerPosition: number - The index of the new position the layer will be moved to
   * }} payload
   * @memberof SetLayerPosition
   */
  constructor (public payload: {layerId: number, newLayerPosition?: number}) {}
}

/**
 * Creates an instance of FetchClickStrategy which can be dispatched to the store
 *  FetchClickStrategy triggers an effect which fetches the click strategy for a layer from OctoPi
 *
 *  Note: this is included in the FetchLayer effect chain. Not a good idea to use this standalone
 *
 * @export
 * @class FetchClickStrategy
 * @implements {Action}
 */
export class FetchClickStrategy implements Action {
  readonly type = LayerActionTypes.FETCH_CLICK_STRATEGY;

  /**
   *Creates an instance of FetchClickStrategy.
   * @param {Layer} payload - The Layer whose click strategy will be fetched
   * @memberof FetchClickStrategy
   */
  constructor(public payload: Layer) {
  }
}
/**
 * Creates an instance of MoveUpLayer which can be dispatched to the store
 *  MoveUpLayer increments a layer's position in the layer list in the layer reducer
 *
 * @export
 * @class MoveUpLayer
 * @implements {Action}
 */
export class MoveUpLayer implements Action {
  readonly type = LayerActionTypes.MOVE_UP_LAYER;

  /**
   *Creates an instance of MoveUpLayer.
   * @param {number} payload - The id of the layer to be moved represented as a string
   * @memberof MoveUpLayer
   */
  constructor(public payload: number) {
  }
}
/**
 * Creates an instance of MoveDownLayer which can be dispatched to the store
 *  MoveDownLayer decrements a layer's position in the layer list in the layer reducer
 *
 * @export
 * @class MoveDownLayer
 * @implements {Action}
 */
export class MoveDownLayer implements Action {
  readonly type = LayerActionTypes.MOVE_DOWN_LAYER;

  /**
   *Creates an instance of MoveDownLayer.
   * @param {number} payload - The id of the layer to be moved represented as a string
   * @memberof MoveDownLayer
   */
  constructor(public payload: number) {
  }
}
/**
 * Creates an instance of FetchClickFormatter which can be dispatched to the store
 *  FetchClickFormatter triggers an effect which fetches the click formatter for a layer from OctoPi
 *
 *  Note: this is included in the FetchLayer effect chain. Not a good idea to use this standalone
 *
 * @export
 * @class FetchClickFormatter
 * @implements {Action}
 */
export class FetchClickFormatter implements Action {
  readonly type = LayerActionTypes.FETCH_CLICK_FORMATTER;

  /**
   *Creates an instance of FetchClickFormatter.
   * @param {Layer} payload - The layer whose click formatter will be fetched
   * @memberof FetchClickFormatter
   */
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
  InitLayerPosition |
  SetLayerPosition |
  MoveUpLayer |
  MoveDownLayer |
  UpdateLayer;
