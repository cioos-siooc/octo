/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Action} from '@ngrx/store';

export enum LayerInformationActionTypes {
  SET_LAYER_INFORMATION = '[Layer information] Set layer information',
  SET_SELECTED_LAYER_ID = '[Layer information] Set selected layer id',
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
   * @param {string} payload - A string containing the HTML to be set
   * @memberof SetLayerInformation
   */
  constructor(public payload: string) {
  }
}

/**
 * Creates an instance of SetSelectedLayerId which can be dispatched to the store
 *  SetSelectedLayerId sets the selectedLayerId property in the layer-information reducer
 *
 * @export
 * @class SetSelectedLayerId
 * @implements {Action}
 */
export class SetSelectedLayerId implements Action {
  readonly type = LayerInformationActionTypes.SET_SELECTED_LAYER_ID;

  /**
   *Creates an instance of SetSelectedLayerId.
   * @param {number} payload - The layer id to be set
   * @memberof SetSelectedLayerId
   */
  constructor(public payload: number) {
  }
}

export type LayerInformationActionsUnion =
  SetLayerInformation |
  SetSelectedLayerId;
