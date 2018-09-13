import { CategoryActionsUnion, CategoryActionTypes } from './../actions/category.actions';
import { NormalizedCategory } from '@app/shared/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface CategoryState extends EntityState<NormalizedCategory> {
  rootCategoryIds: Number[];
  layerCategoryIds: Number[];
}

export const adapter: EntityAdapter<NormalizedCategory> = createEntityAdapter<NormalizedCategory>({
  selectId: (category: NormalizedCategory) => category.id,
  sortComparer: false
});

export const initialState: CategoryState = adapter.getInitialState({
  rootCategoryIds: [],
  layerCategoryIds: []
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
    case CategoryActionTypes.APPEND_LAYER_CATEGORY_IDS:
      return {
        ...state,
        layerCategoryIds: [...state.layerCategoryIds, ...action.payload]
      };
    case CategoryActionTypes.UPDATE_CATEGORY:
      return adapter.updateOne(action.payload, state);
    default:
      return state;
  }
}

export const {
  selectIds: selectCategoryIds,
  selectEntities: selectCategoryEntities,
  selectAll: selectAllCategories,
  selectTotal: selectCategoriesTotal,
} = adapter.getSelectors();
