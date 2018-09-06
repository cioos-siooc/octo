import { CategoryActionsUnion, CategoryActionTypes } from './../actions/category.actions';
import { NormalizedCategory } from '@app/shared/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface CategoryState extends EntityState<NormalizedCategory> {
}

export const adapter: EntityAdapter<NormalizedCategory> = createEntityAdapter<NormalizedCategory>({
    selectId: (category: NormalizedCategory) => category.id,
    sortComparer: false
});

export function categoryReducer(state: CategoryState = adapter.getInitialState(), action: CategoryActionsUnion): CategoryState {
    switch (action.type) {
        case CategoryActionTypes.APPEND_CATEGORIES:
            return adapter.addMany(action.payload, state);
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
