/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { Update } from '@ngrx/entity';
import { NormalizedCategory } from '@app/shared/models';
import { Action } from '@ngrx/store';

export enum CategoryActionTypes {
  FETCH_CATEGORIES_FOR_TOPIC = '[Category] Fetch Categories For Topic',
  APPEND_CATEGORIES = '[Category] Append Categories',
  APPEND_ROOT_CATEGORY_IDS = '[Category] Append Root Category IDs',
  APPEND_LAYER_CATEGORY_IDS = '[Category] Append Layer Category IDs',
  UPDATE_CATEGORY = '[Category] Update Category',
  REMOVE_CATEGORY_TREE = '[Category] Remove Category Tree',
  REMOVE_ALL_CATEGORIES = '[Category] Remove All Categories'
}

/**
 * Creates an instance of FetchCategoriesForTopic which can be dispatched to the store
 *  FetchCategoriesForTopic triggers an effect which fetches the category tree for a topic
 *
 * @export
 * @class FetchCategoriesForTopic
 * @implements {Action}
 */
export class FetchCategoriesForTopic implements Action {
  readonly type = CategoryActionTypes.FETCH_CATEGORIES_FOR_TOPIC;

  /**
   *Creates an instance of FetchCategoriesForTopic.
   * @param {number} payload - The id of the topic whose category tree should be fetched
   * @memberof FetchCategoriesForTopic
   */
  constructor(public payload: number) {
  }
}

/**
 * Creates an instance of AppendCategories which can be dispatched to the store
 *  AppendCategories appends a list of categories to the category list in the category reducer
 *
 * @export
 * @class AppendCategories
 * @implements {Action}
 */
export class AppendCategories implements Action {
  readonly type = CategoryActionTypes.APPEND_CATEGORIES;

  /**
   *Creates an instance of AppendCategories.
   * @param {NormalizedCategory[]} payload - The list of categories to be appended
   * @memberof AppendCategories
   */
  constructor(public payload: NormalizedCategory[]) {
  }
}

/**
 * Creates an instance of AppendRootCategoryIds which can be dispatched to the store
 *  AppendRootCategoryIds adds a list of root category IDs to the rootCategoryIds list in the
 *  category reducer
 * 
 * Note: no longer used
 *
 * @export
 * @class AppendRootCategoryIds
 * @implements {Action}
 */
export class AppendRootCategoryIds implements Action {
  readonly type = CategoryActionTypes.APPEND_ROOT_CATEGORY_IDS;

  /**
   *Creates an instance of AppendRootCategoryIds.
   * @param {Number[]} payload - A list of category IDs to be appended
   * @memberof AppendRootCategoryIds
   */
  constructor(public payload: Number[]) {
  }
}

/**
 * Creates an instance of AppendLayerCategoryIds which can be dispatched to the store
 *  AppendLayerCategoryIds adds a list of layer category IDs to the layerCategoryIds list in the
 *  category reducer
 * 
 * Note: no longer used
 *
 * @export
 * @class AppendLayerCategoryIds
 * @implements {Action}
 */
export class AppendLayerCategoryIds implements Action {
  readonly type = CategoryActionTypes.APPEND_LAYER_CATEGORY_IDS;

  /**
   *Creates an instance of AppendLayerCategoryIds.
   * @param {Number[]} payload - A list of category IDs to be appended
   * @memberof AppendLayerCategoryIds
   */
  constructor(public payload: Number[]) {
  }
}

/**
 * Creates an instance of UpdateCategory which can be dispatched to the store
 *  UpdateCategory updates the given category in the store to match that in the payload
 *  The existing category is found based on the category id
 *
 * @export
 * @class UpdateCategory
 * @implements {Action}
 */
export class UpdateCategory implements Action {
  readonly type = CategoryActionTypes.UPDATE_CATEGORY;

  /**
   *Creates an instance of UpdateCategory.
   * @param {Update<NormalizedCategory>} payload - The new version of the category to be updated
   * @memberof UpdateCategory
   */
  constructor(public payload: Update<NormalizedCategory>) {
  }
}

/**
 * Creates an instance of RemoveCategoryTree which can be dispatched to the store
 *  RemoveCategoryTree removes the entire tree of categories starting at the given category id
 *
 * @export
 * @class RemoveCategoryTree
 * @implements {Action}
 */
export class RemoveCategoryTree implements Action {
  readonly type = CategoryActionTypes.REMOVE_CATEGORY_TREE;

  /**
   *Creates an instance of RemoveCategoryTree.
   * @param {Number} payload - The id of the category where the tree removal should begin
   * @memberof RemoveCategoryTree
   */
  constructor(public payload: Number) {
  }
}

/**
 * Creates an instance of RemoveAllCategories which can be dispatched to the store
 *  RemoveAllCategories removes all categories from the cateogry store
 *
 * @export
 * @class RemoveAllCategories
 * @implements {Action}
 */
export class RemoveAllCategories implements Action {
  readonly type = CategoryActionTypes.REMOVE_ALL_CATEGORIES;

  constructor() {
  }
}

export type CategoryActionsUnion =
  FetchCategoriesForTopic |
  AppendCategories |
  AppendRootCategoryIds |
  AppendLayerCategoryIds |
  UpdateCategory |
  RemoveCategoryTree |
  RemoveAllCategories;
