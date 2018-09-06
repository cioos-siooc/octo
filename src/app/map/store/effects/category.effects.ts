import { environment } from './../../../../environments/environment';
import { Category, TopicHierarchy, NormalizedCategory } from '@app/shared/models';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { MapState } from '@app/map/store';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import { schema, normalize } from 'normalizr';
import { FetchCategoriesForTopic, AppendCategories, CategoryActionTypes } from './../actions/category.actions';

@Injectable()
export class CategoryEffects {
    @Effect()
    fetchCategoriesForTopic = this.actions$
    .ofType<FetchCategoriesForTopic>(CategoryActionTypes.FETCH_CATEGORIES_FOR_TOPIC)
    .pipe(
        switchMap((action: FetchCategoriesForTopic) => {
            return this.httpClient.get<TopicHierarchy>
            ( `${environment.mapapiUrl}/topics/${action.payload}/getTopicHierarchy`);
        }),
        map((topicHierarchy) => {
            // Create the schema for normalizr
            const categoryEntity = new schema.Entity('category', {}, {
                idAttribute: 'id'
            });
            categoryEntity.define({
                categories: [ categoryEntity ]
            });
            const categories: Category = topicHierarchy.root;
            // Use the normalizr schema to flatten the hierarchy
            const normalized = normalize(categories, categoryEntity);

            // Convert the flattened hierarchy to an array for EntityAdapter
            const normalizedCategories: NormalizedCategory[] = Object.entries(normalized.entities.category).map(
                c => <NormalizedCategory>c[1]
            );
            return new AppendCategories(normalizedCategories);
        })
    );

    constructor(private actions$: Actions, private store$: Store<MapState>, private httpClient: HttpClient) {
    }
}
