/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as fromLayerPresentation from '@app/map/store/reducers/layer-presentation.reducers';
import {layerPresentationReducer} from '@app/map/store/reducers/layer-presentation.reducers';
import {ClientPresentation} from '@app/shared/models';
import {SetClientPresentations, SetCurrentClientPresentation, SetLayerUniqueId} from '@app/map/store';

describe('LayerPresentationReducer', () => {

  it('should return default state when no state and no action passed', () => {
    expect(layerPresentationReducer(undefined, <any>{})).toEqual(fromLayerPresentation.initialState);
  });

  it('should have immutable payload', () => {
    const currentClientPresentation = new ClientPresentation();
    currentClientPresentation.id = 3;
    currentClientPresentation.namedStyle = 'style-test';
    const action = new SetCurrentClientPresentation(currentClientPresentation);
    const finalState = layerPresentationReducer(fromLayerPresentation.initialState, action);
    currentClientPresentation.id = 4;
    expect(finalState.currentClientPresentation).not.toEqual(currentClientPresentation);
  });

  it('should add client presentation to state.clientPresentations', () => {
    const clientPresentation = new ClientPresentation();
    clientPresentation.id = 3;
    clientPresentation.namedStyle = '3';
    const clientPresentation2 = new ClientPresentation();
    clientPresentation2.id = 4;
    clientPresentation2.namedStyle = '4';
    const clientPresentations: ClientPresentation[] = [];
    clientPresentations.push(clientPresentation);
    clientPresentations.push(clientPresentation2);
    const action = new SetClientPresentations(clientPresentations);
    const finalState = layerPresentationReducer(fromLayerPresentation.initialState, action);
    expect(finalState.clientPresentations).toEqual(clientPresentations);
  });

  it('should set state.currentClientPresentation', () => {
    const currentClientPresentation = new ClientPresentation();
    currentClientPresentation.id = 3;
    currentClientPresentation.namedStyle = 'style-test';
    const action = new SetCurrentClientPresentation(currentClientPresentation);
    const finalState = layerPresentationReducer(fromLayerPresentation.initialState, action);
    expect(finalState.currentClientPresentation).toEqual(currentClientPresentation);
  });

  it('should set state.layerUniqueId', () => {
    const layerUniqueId = '3';
    const action = new SetLayerUniqueId(layerUniqueId);
    const finalState = layerPresentationReducer(fromLayerPresentation.initialState, action);
    expect(finalState.layerUniqueId).toEqual(layerUniqueId);
  });

});
