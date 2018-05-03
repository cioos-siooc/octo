import {Action} from '@ngrx/store';

export const ADD_BEHAVIOR = 'BEHAVIOR_ADD';
export const UPDATE_BEHAVIOR = 'BEHAVIOR_UPDATE';
export const DELETE_BEHAVIOR = 'BEHAVIOR_DELETE';

export class AddBehavior implements Action {
  readonly type = ADD_BEHAVIOR;

  constructor(public payload: any) {
  }
}

export class UpdateBehavior implements Action {
  readonly type = UPDATE_BEHAVIOR;

  constructor(public payload: any) {
  }
}

export class DeleteBehavior implements Action {
  readonly type = DELETE_BEHAVIOR;

  constructor(public payload: string) {
  }
}

export type BehaviorActions =
  AddBehavior |
  UpdateBehavior |
  DeleteBehavior;
