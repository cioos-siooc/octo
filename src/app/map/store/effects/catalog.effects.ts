/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';

import {concatMap, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {
  CatalogActionTypes,
  FetchCategoryHierarchy,
  FetchTopic,
  FetchTopicForCode,
  FetchTopicGroup,
  SetTopicExpanded,
  SetTopicGroup
} from '../actions/catalog.actions';
import {TopicGroup} from '@app/shared/models';
import {Topic} from '@app/shared/models';
import {environment} from '@env/environment';
import {TopicHierarchy} from '@app/shared/models';
import {Category} from '@app/shared/models';
import {MapState} from '../reducers';
import {selectCatalogState} from '../selectors/catalog.selectors';

@Injectable()
export class CatalogEffects {
  @Effect()
  loadTopicGroup = this.actions$
    .ofType<FetchTopicGroup>(CatalogActionTypes.FETCH_TOPIC_GROUP)
    .pipe(switchMap((action: FetchTopicGroup) => {
        return this.httpClient.get<TopicGroup>
        (`${environment.mapapiUrl}/topic-groups/getTopicGroupForCode?code=${action.payload.code}` +
          `&language-code=${action.payload.languageCode}`);
      })
      , mergeMap(
        (topicGroup) => [
          new SetTopicGroup(topicGroup),
          ...topicGroup.topicIds.map(topicId => {
            return new FetchTopic(topicId);
          })
        ]
      ));
  @Effect()
  loadTopic = this.actions$
    .ofType<FetchTopic>(CatalogActionTypes.FETCH_TOPIC)
    .pipe(concatMap((action: FetchTopic) => {
        return this.httpClient.get<Topic>(`${environment.mapapiUrl}/topics/${action.payload}`);
      })
      , map(
        (topic) => {
          topic.expanded = false;
          return {
            type: CatalogActionTypes.APPEND_TOPIC,
            payload: topic
          };
        }
      ));
  @Effect()
  fetchTopicByCode = this.actions$
    .ofType<FetchTopicForCode>(CatalogActionTypes.FETCH_TOPIC_FOR_CODE)
    .pipe(concatMap((action: FetchTopicForCode) => {
        return this.httpClient.get<Topic>(`${environment.mapapiUrl}/topics/getTopicForCode?code=${action.payload.code}` +
          `&language-code=${action.payload.languageCode}`);
      })
      , map(
        (topic) => {
          topic.expanded = false;
          return {
            type: CatalogActionTypes.APPEND_TOPIC,
            payload: topic
          };
        }
      ));
  @Effect()
  loadCategory = this.actions$
    .ofType<SetTopicExpanded>(CatalogActionTypes.SET_TOPIC_EXPANDED)
    // TODO: payload should be topicId instead
    .pipe(map((action: SetTopicExpanded) => action.payload)
      , withLatestFrom(this.store$.select(selectCatalogState))
      , switchMap(([payload, store]) => {
        const isLoaded = Boolean(store.topics[payload.topicIndex].category);
        let obs;
        if (isLoaded) {
          obs = of({type: 'NO_ACTION'});
        } else {
          const topicId = store.topics[payload.topicIndex].id;
          // TODO : Should probably send topicId in payload instead
          obs = of(new FetchCategoryHierarchy(payload.topicIndex));
        }
        return obs;
      }));
  @Effect()
  loadCategoryHierarchy = this.actions$
    .ofType<FetchCategoryHierarchy>(CatalogActionTypes.FETCH_CATEGORY_HIERARCHY)
    .pipe(map((action: FetchCategoryHierarchy) => action.payload)
      , withLatestFrom(this.store$.select(selectCatalogState))
      // TODO: Should use topic id as payload and could use the id directly here instead
      , concatMap(([payload, store]) => {
        const topicId = store.topics[payload].id;
        return this.httpClient.get<TopicHierarchy>(`${environment.mapapiUrl}/topics/${topicId}/getTopicHierarchy`);
      })
      , map(
        (topicHierarchy) => {
          const category: Category = topicHierarchy.root;
          return {
            type: CatalogActionTypes.SET_CATEGORIES,
            payload: {topicId: topicHierarchy.id, category: category}
          };
        }
      ));

  constructor(private actions$: Actions, private store$: Store<MapState>, private httpClient: HttpClient) {
  }
}
