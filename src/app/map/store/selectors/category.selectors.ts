/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {selectMapState} from '../reducers';
import {createSelector} from '@ngrx/store';
import * as fromCategory from '../reducers/category.reducers';

export const selectCategoryState = createSelector(
  selectMapState,
  state => state.category,
);

export const selectAllCategories = createSelector(
  selectCategoryState,
  fromCategory.selectAllCategories,
);

export const selectCategoryIds = createSelector(
  selectCategoryState,
  fromCategory.selectCategoryIds
);

export const selectCategoryEntities = createSelector(
  selectCategoryState,
  fromCategory.selectCategoryEntities
);

export const selectCategoriesTotal = createSelector(
  selectCategoryState,
  fromCategory.selectCategoriesTotal
);

export const selectRootCategoryIds = createSelector(
  selectCategoryState,
  (categoryState) => {
    return categoryState.rootCategoryIds;
  }
);

export const selectLayerCategoryIds = createSelector(
  selectCategoryState,
  (categoryState) => {
    return categoryState.layerCategoryIds;
  }
);

export const selectCategoryById = (id) => createSelector(
  selectCategoryEntities,
  (categories) => {
    if (categories) {
      return categories[id];
    } else {
      return {};
    }
  }
);
