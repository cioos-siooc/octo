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

export class SetLayerInformation implements Action {
  readonly type = LayerInformationActionTypes.SET_LAYER_INFORMATION;

  constructor(public payload: string) {
  }
}

export class SetSelectedLayerId implements Action {
  readonly type = LayerInformationActionTypes.SET_SELECTED_LAYER_ID;

  constructor(public payload: number) {
  }
}

export type LayerInformationActionsUnion =
  SetLayerInformation |
  SetSelectedLayerId;
