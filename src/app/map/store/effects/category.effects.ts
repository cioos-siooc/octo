/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { environment } from './../../../../environments/environment';
import { Category, TopicHierarchy, NormalizedCategory } from '@app/shared/models';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { MapState } from '@app/map/store';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import { schema, normalize } from 'normalizr';
import { FetchCategoriesForTopic, AppendCategories, AppendRootCategoryIds,
    CategoryActionTypes } from './../actions/category.actions';

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
        mergeMap((topicHierarchy) => {
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
                c => {
                    return <NormalizedCategory>c[1];
                }
            );

            return [
                new AppendCategories(normalizedCategories),
                new AppendRootCategoryIds([ normalized.result ])
            ];
        })
    );

    constructor(private actions$: Actions, private store$: Store<MapState>, private httpClient: HttpClient) {
    }
}

function appendCategories(topicHierarchy) {

}