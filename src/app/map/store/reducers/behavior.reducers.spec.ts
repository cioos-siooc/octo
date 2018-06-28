/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as fromBehavior from '@app/map/store/reducers/behavior.reducers';
import {behaviorReducer} from '@app/map/store/reducers/behavior.reducers';
import {AddBehavior, DeleteBehavior, UpdateBehavior} from '@app/map/store';

describe('BehaviorReducer', () => {

  it('should return default state when no state and no action passed', () => {
    expect(behaviorReducer(undefined, <any>{})).toEqual(fromBehavior.initialState);
  });

  it('should have immutable payload', () => {
    const behavior = {handler: 'time', parameterName: 'TIME'};
    const action = new AddBehavior(behavior);
    const finalState = behaviorReducer(fromBehavior.initialState, action);
    behavior.handler = 'not-time';
    expect(finalState.behaviors).not.toEqual([behavior]);
  });

  it('should add behavior to state.behaviors', () => {
    const behavior = {handler: 'time', parameterName: 'TIME'};
    const action = new AddBehavior(behavior);
    const finalState = behaviorReducer(fromBehavior.initialState, action);
    expect(finalState.behaviors).toEqual([behavior]);
  });

  it('should update behavior in state.behaviors', () => {
    const behavior = {handler: 'time', parameterName: 'TIME', uniqueId: '3'};
    const initialState = {behaviors: [behavior]};
    const updatedBehavior = {handler: 'time', parameterName: 'ZING', uniqueId: '3'};
    const action = new UpdateBehavior(updatedBehavior);
    const finalState = behaviorReducer(initialState, action);
    expect(finalState.behaviors).toEqual([updatedBehavior]);
  });

  it('should remove behavior from state.behaviors', () => {
    const behavior = {handler: 'time', parameterName: 'TIME', uniqueId: '3'};
    const initialState = {behaviors: [behavior]};
    const action = new DeleteBehavior('3');
    const finalState = behaviorReducer(initialState, action);
    expect(finalState.behaviors).toEqual([]);
  });


});
