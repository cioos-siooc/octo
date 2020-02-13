/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Action} from '@ngrx/store';
import { LayerInformation } from '@app/shared/models';

export enum LayerInformationActionTypes {
  FETCH_LAYER_INFORMATION = '[Layer information] Fetch layer information',
  SET_LAYER_INFORMATION = '[Layer information] Set layer information',
}

export class FetchLayerInformation implements Action {
  readonly type = LayerInformationActionTypes.FETCH_LAYER_INFORMATION;

  // payload is layerId
  constructor(public payload: Number) {
  }
}

/**
 * Creates an instance of SetLayerInformation which can be dispatched to the store
 *  SetLayerInformation sets the informationHtml property in the layer-information reducer
 *
 * @export
 * @class SetLayerInformation
 * @implements {Action}
 */
export class SetLayerInformation implements Action {
  readonly type = LayerInformationActionTypes.SET_LAYER_INFORMATION;

  /**
   *Creates an instance of SetLayerInformation.
   * @param {LayerInformation} payload - An object containing the layer information
   * @memberof SetLayerInformation
   */
  constructor(public payload: LayerInformation) {
  }
}

export type LayerInformationActionsUnion =
  SetLayerInformation |
  FetchLayerInformation;
