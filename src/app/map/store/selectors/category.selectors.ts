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
