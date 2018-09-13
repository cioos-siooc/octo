import { Update } from '@ngrx/entity';
import { NormalizedCategory } from '@app/shared/models';
import { Action } from '@ngrx/store';

export enum CategoryActionTypes {
  FETCH_CATEGORIES_FOR_TOPIC = '[Category] Fetch Categories For Topic',
  APPEND_CATEGORIES = '[Category] Append Categories',
  APPEND_ROOT_CATEGORY_IDS = '[Category] Append Root Category IDs',
  APPEND_LAYER_CATEGORY_IDS = '[Category] Append Layer Category IDs',
  UPDATE_CATEGORY = '[Category] Update Category',
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

export class AppendRootCategoryIds implements Action {
  readonly type = CategoryActionTypes.APPEND_ROOT_CATEGORY_IDS;

  constructor(public payload: Number[]) {
  }
}

export class AppendLayerCategoryIds implements Action {
  readonly type = CategoryActionTypes.APPEND_LAYER_CATEGORY_IDS;

  constructor(public payload: Number[]) {
  }
}

export class UpdateCategory implements Action {
  readonly type = CategoryActionTypes.UPDATE_CATEGORY;

  constructor(public payload: Update<NormalizedCategory>) {
  }
}

export type CategoryActionsUnion =
  FetchCategoriesForTopic |
  AppendCategories |
  AppendRootCategoryIds |
  AppendLayerCategoryIds |
  UpdateCategory;
