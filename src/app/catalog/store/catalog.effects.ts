import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';

import {environment} from '../../../environments/environment';
import {Category} from '../../shared/category.model';
import {TopicGroup} from '../../shared/topic-group.model';
import {TopicHierarchy} from '../../shared/topic-hierarchy.model';
import {Topic} from '../../shared/topic.model';
import {AppState} from '../../store/app.reducers';
import * as CatalogActions from './catalog.actions';
import {concatMap, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class CatalogEffects {
  @Effect()
  loadTopicGroup = this.actions$
    .ofType(CatalogActions.FETCH_TOPIC_GROUP)
    .pipe(switchMap((action: CatalogActions.FetchTopicGroup) => {
        return this.httpClient.get<TopicGroup>
        (`${environment.mapapiUrl}/topic-groups/getTopicGroupForCode?code=${action.payload.code}` +
          `&language-code=${action.payload.languageCode}`);
      })
      , mergeMap(
        (topicGroup) => [
          new CatalogActions.SetTopicGroup(topicGroup),
          ...topicGroup.topicIds.map(topicId => {
            return new CatalogActions.FetchTopic(topicId);
          })
        ]
      ));
  @Effect()
  loadTopic = this.actions$
    .ofType(CatalogActions.FETCH_TOPIC)
    .pipe(concatMap((action: CatalogActions.FetchTopic) => {
        return this.httpClient.get<Topic>(`${environment.mapapiUrl}/topics/${action.payload}`);
      })
      , map(
        (topic) => {
          topic.expanded = false;
          return {
            type: CatalogActions.APPEND_TOPIC,
            payload: topic
          };
        }
      ));
  @Effect()
  fetchTopicByCode = this.actions$
    .ofType(CatalogActions.FETCH_TOPIC_FOR_CODE)
    .pipe(concatMap((action: CatalogActions.FetchTopicForCode) => {
        return this.httpClient.get<Topic>(`${environment.mapapiUrl}/topics/getTopicForCode?code=${action.payload.code}` +
          `&language-code=${action.payload.languageCode}`);
      })
      , map(
        (topic) => {
          topic.expanded = false;
          return {
            type: CatalogActions.APPEND_TOPIC,
            payload: topic
          };
        }
      ));
  @Effect()
  loadCategory = this.actions$
    .ofType(CatalogActions.SET_TOPIC_EXPANDED)
    // TODO: payload should be topicId instead
    .pipe(map((action: CatalogActions.SetTopicExpanded) => action.payload)
      , withLatestFrom(this.store$.select('catalog'))
      , switchMap(([payload, store]) => {
        const isLoaded = Boolean(store.topics[payload.topicIndex].category);
        let obs;
        if (isLoaded) {
          obs = of({type: 'NO_ACTION'});
        } else {
          const topicId = store.topics[payload.topicIndex].id;
          // TODO : Should probably send topicId in payload instead
          obs = of(new CatalogActions.FetchCategoryHierarchy(payload.topicIndex));
        }
        return obs;
      }));
  @Effect()
  loadCategoryHierarchy = this.actions$
    .ofType(CatalogActions.FETCH_CATEGORY_HIERARCHY)
    .pipe(map((action: CatalogActions.FetchCategoryHierarchy) => action.payload)
      , withLatestFrom(this.store$.select('catalog'))
      // TODO: Should use topic id as payload and could use the id directly here instead
      , concatMap(([payload, store]) => {
        const topicId = store.topics[payload].id;
        return this.httpClient.get<TopicHierarchy>(`${environment.mapapiUrl}/topics/${topicId}/getTopicHierarchy`);
      })
      , map(
        (topicHierarchy) => {
          const category: Category = topicHierarchy.root;
          return {
            type: CatalogActions.SET_CATEGORIES,
            payload: {topicId: topicHierarchy.id, category: category}
          };
        }
      ));

  constructor(private actions$: Actions, private store$: Store<AppState>, private httpClient: HttpClient) {
  }
}
