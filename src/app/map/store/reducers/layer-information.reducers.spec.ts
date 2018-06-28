/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as fromLayerInformation from '@app/map/store/reducers/layer-information.reducers';
import {layerInformationReducer} from '@app/map/store/reducers/layer-information.reducers';
import {SetLayerInformation, SetSelectedLayerId} from '@app/map/store';

describe('LayerInformationReducer', () => {

  it('should return default state when no state and no action passed', () => {
    expect(layerInformationReducer(undefined, <any>{})).toEqual(fromLayerInformation.initialState);
  });

  it('should set state.informationHtml', () => {
    const informationHtml = '<html><body><h5>Test</h5></body></html>';
    const action = new SetLayerInformation(informationHtml);
    const finalState = layerInformationReducer(fromLayerInformation.initialState, action);
    expect(finalState.informationHtml).toEqual(informationHtml);
  });

  it('should set state.selectedLayerId', () => {
    const selectedLayerId = 3;
    const action = new SetSelectedLayerId(selectedLayerId);
    const finalState = layerInformationReducer(fromLayerInformation.initialState, action);
    expect(finalState.selectedLayerId).toEqual(selectedLayerId);
  });
});
