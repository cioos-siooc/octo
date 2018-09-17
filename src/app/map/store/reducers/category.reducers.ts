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
    case CategoryActionTypes.REMOVE_CATEGORY_TREE:
      return removeCategoryTree(action.payload, state);
    default:
      return state;
  }
}

function removeCategoryTree(id: Number, state: CategoryState) {
  // Remove the current category
  const currentCategory: NormalizedCategory = {...state.entities[id]};
  adapter.removeOne(currentCategory.id, state);

  let newState: CategoryState = null;

  switch (currentCategory.type) {
    case 'root':
      const newRootCategoryIds = [...state.rootCategoryIds.filter(
        rootId => rootId !== currentCategory.id
      )];
      newState = {
        ...state,
        rootCategoryIds: newRootCategoryIds
      };
      break;
    case 'layer':
      const newLayerCategoryIds = [...state.layerCategoryIds.filter(
        layerId => layerId !== currentCategory.id 
      )];
      newState = {
        ...state,
        layerCategoryIds: newLayerCategoryIds
      };
      break;
    default:
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
