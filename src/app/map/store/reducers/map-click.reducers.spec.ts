/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as fromMapClick from '@app/map/store/reducers/map-click.reducers';
import {mapClickReducer} from '@app/map/store/reducers/map-click.reducers';
import {MapClickInfo} from '@app/shared/models';
import {SetMapClickInfo, SetMapClickLayerUniqueId} from '@app/map/store';

describe('MapClickReducer', () => {

  it('should return default state when no state and no action passed', () => {
    expect(mapClickReducer(undefined, <any>{})).toEqual(fromMapClick.initialState);
  });

  it('should have immutable payload', () => {
    const mapClickInfo = new MapClickInfo();
    mapClickInfo.html = '<html></html>';
    mapClickInfo.result = 5;
    const action = new SetMapClickInfo(mapClickInfo);
    const finalState = mapClickReducer(fromMapClick.initialState, action);
    mapClickInfo.result = 6;
    expect(finalState.mapClickInfo).not.toEqual(mapClickInfo);
  });

  it('should set state.mapClickInfo', () => {
    const mapClickInfo = new MapClickInfo();
    mapClickInfo.html = '<html></html>';
    mapClickInfo.result = 5;
    const action = new SetMapClickInfo(mapClickInfo);
    const finalState = mapClickReducer(fromMapClick.initialState, action);
    expect(finalState.mapClickInfo).toEqual(mapClickInfo);
  });

  it('should set state.mapClickLayerUniqueId', () => {
    const layerUniqueId = '6';
    const action = new SetMapClickLayerUniqueId(layerUniqueId);
    const finalState = mapClickReducer(fromMapClick.initialState, action);
    expect(finalState.mapClickLayerUniqueId).toEqual(layerUniqueId);
  });

});
