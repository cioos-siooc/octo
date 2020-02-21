/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { CategoryActionsUnion, CategoryActionTypes } from './../actions/category.actions';
import { NormalizedCategory } from '@app/shared/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

/**
 * Stores a list of key:value pairs representing Categories
 *  Also stores a list of root category IDs and a list of layer Category IDs
 *
 * @export
 * @interface CategoryState
 * @extends {EntityState<NormalizedCategory>}
 */
export interface CategoryState extends EntityState<NormalizedCategory> {
  rootCategoryIds: Number[];
}

export const adapter: EntityAdapter<NormalizedCategory> = createEntityAdapter<NormalizedCategory>({
  selectId: (category: NormalizedCategory) => category.id,
  sortComparer: false
});

export const initialState: CategoryState = adapter.getInitialState({
  rootCategoryIds: []
});

export function categoryReducer(state: CategoryState = initialState, action: CategoryActionsUnion): CategoryState {
  switch (action.type) {
    case CategoryActionTypes.APPEND_CATEGORIES:
      return adapter.addMany(action.payload, state);
    case CategoryActionTypes.APPEND_ROOT_CATEGORY_IDS:
      return {
        ...state,
        rootCategoryIds: [...state.rootCategoryIds, ...action.payload]
      };
    case CategoryActionTypes.UPDATE_CATEGORY:
      return adapter.updateOne(action.payload, state);
    case CategoryActionTypes.REMOVE_CATEGORY_TREE:
      return removeCategoryTree(action.payload, state);
    case CategoryActionTypes.REMOVE_ALL_CATEGORIES:
      return adapter.removeAll({ ...state, rootCategoryIds: [] });
    default:
      return state;
  }
}

function removeCategoryTree(id: Number, state: CategoryState) {
  // Remove the current category
  const currentCategory: NormalizedCategory = {...state.entities[id.toString()]};
  adapter.removeOne(currentCategory.id, state);

  let newState: CategoryState = null;

  if (currentCategory.type === 'root') {
    const newRootCategoryIds = [...state.rootCategoryIds.filter(
      rootId => rootId !== currentCategory.id
    )];
    newState = {
      ...state,
      rootCategoryIds: newRootCategoryIds
    };
  } else {
    newState = state;
  }

  // Recursively remove the children of the current category
  for (const childId of currentCategory.categories) {
    removeCategoryTree(childId, newState);
  }
  return newState;
}

export const {
  selectIds: selectCategoryIds,
  selectEntities: selectCategoryEntities,
  selectAll: selectAllCategories,
  selectTotal: selectCategoriesTotal,
} = adapter.getSelectors();
