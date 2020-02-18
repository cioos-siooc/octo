/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { TimeActionsUnion, TimeActionsTypes } from './../actions/time.actions';

 export interface TimeState {
    datetime: Date;
 }

 export const initialState: TimeState = {
     datetime: null,
 };

export function timeReducer(state = initialState, action: TimeActionsUnion): TimeState {
    switch (action.type) {
        case TimeActionsTypes.UPDATE_TIME:
            const cloneState = {
                ...state,
                datetime: action.payload
            };
            return cloneState;
        default:
            return state;
    }
}
