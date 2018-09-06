import { NormalizedCategory } from '@app/shared/models';
import { Action } from '@ngrx/store';

export enum CategoryActionTypes {
    FETCH_CATEGORIES_FOR_TOPIC = '[Category] Fetch Categories For Topic',
    APPEND_CATEGORIES = '[Category] Append Categories',
}

export class FetchCategoriesForTopic implements Action {
    readonly type = CategoryActionTypes.FETCH_CATEGORIES_FOR_TOPIC;

    constructor(public payload: number) {
    }
}

export class AppendCategories implements Action {
    readonly type = CategoryActionTypes.APPEND_CATEGORIES;

    constructor(public payload: NormalizedCategory[]) {
    }
}

export type CategoryActionsUnion =
    FetchCategoriesForTopic |
    AppendCategories;
