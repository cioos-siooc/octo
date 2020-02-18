/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { UpdateBehavior } from './../actions/behavior.actions';
import { StoreState } from './../reducers/index';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { UpdateTime, TimeActionsTypes } from '../actions';
import { mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class TimeEffects {

    @Effect()
    updateTime = this.actions$
    .ofType<UpdateTime>(TimeActionsTypes.UPDATE_TIME)
    .pipe(
        withLatestFrom(this.store$),
        mergeMap(([action, store]) => {
            // put in a list every behaviors that the handler is set to time and mode set to sync
            const syncBehaviorList = store.map.behavior.behaviors.filter(function(behavior) {
                return behavior.handler === 'time' && behavior.mode === 'sync';
            });
            const actions = [];
            for (const behavior of syncBehaviorList) {
                const updatedBehavior = {
                    ...behavior,
                    currentDate: action.payload
                };
                actions.push(new UpdateBehavior(updatedBehavior));
            }
            return actions;
        }
    )
    );



constructor(private actions$: Actions, private store$: Store<StoreState>) {}

}
