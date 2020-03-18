/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { Action } from '@ngrx/store';

 export enum TimeActionsTypes {
    UPDATE_TIME = '[TIME] Update'
 }

 export class UpdateTime implements Action {
    readonly type = TimeActionsTypes.UPDATE_TIME;

    constructor(public payload: Date) {}
 }

 export type TimeActionsUnion =
    UpdateTime;
