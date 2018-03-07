import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/withLatestFrom';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { TopicGroup } from '../../shared/topic-group.model';
import { Topic } from '../../shared/topic.model';
import * as CatalogActions from './catalog.actions';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { TopicHierarchy } from '../../shared/topic-hierarchy.model';
import { Category } from '../../shared/category.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class CatalogEffects {
    constructor(private actions$: Actions, private store$: Store<AppState>, private httpClient: HttpClient) {}

    @Effect()
    loadTopicGroup = this.actions$
        .ofType(CatalogActions.FETCH_TOPIC_GROUP)
        .switchMap((action: CatalogActions.FetchTopicGroup) => {
            return this.httpClient.get<TopicGroup>(
                environment.mapapiUrl.concat('/topic-groups/', String(action.payload)), {})
        })
        .mergeMap(
            (topicGroup) => [
                new CatalogActions.SetTopicGroup(topicGroup),
                ...topicGroup.topicIds.map(topicId => {
                    return new CatalogActions.FetchTopic(topicId)
                })
            ]
        )
    
    @Effect()
    loadTopic = this.actions$
        .ofType(CatalogActions.FETCH_TOPIC)
        .concatMap((action: CatalogActions.FetchTopic) => {
            return this.httpClient.get<Topic>(
                environment.mapapiUrl.concat('/topics/', String(action.payload)), {})
        })
        .map(
            (topic) => {
                topic.expanded = false;
                return {
                    type: CatalogActions.APPEND_TOPIC,
                    payload: topic
                }
            }
        );
    
    @Effect()
    loadCategory = this.actions$
        .ofType(CatalogActions.SET_TOPIC_EXPANDED)
        .map((action: CatalogActions.SetTopicExpanded) => action.payload)
        .withLatestFrom(this.store$.select('catalog'))
        .switchMap(([payload, store]) => {
            const isLoaded = Boolean(store.topics[payload.topicId].category);
            let obs;
            if (isLoaded) {
                obs = Observable.of({type: "NO_ACTION"});
            } else {
                const topicId = store.topics[payload.topicId].id;
                obs = Observable.of(new CatalogActions.FetchCategoryHierarchy(payload.topicId));
            }
            return obs;
        });

    @Effect()
    loadCategoryHierarchy = this.actions$
        .ofType(CatalogActions.FETCH_CATEGORY_HIERARCHY)
        .map((action: CatalogActions.FetchCategoryHierarchy) => action.payload)
        .withLatestFrom(this.store$.select('catalog'))
        .concatMap(([payload, store]) => {
            const topicId = store.topics[payload].id;
            return this.httpClient.get<TopicHierarchy>(
                environment.mapapiUrl.concat('/topics/', String(topicId), '/getTopicHierarchy'), {})
        })
        .map(
            (topicHierarchy) => {
                const category: Category = topicHierarchy.root;
                return {
                    type: CatalogActions.SET_CATEGORIES,
                    payload: {topicId: topicHierarchy.id, category: category}
                };
            }
        );
}