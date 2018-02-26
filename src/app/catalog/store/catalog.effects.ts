import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { TopicGroup } from '../../shared/topic-group.model';
import { Topic } from '../../shared/topic.model';
import * as CatalogActions from './catalog.actions';

@Injectable()
export class CatalogEffects {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    @Effect()
    loadTopicGroup = this.actions$
        .ofType(CatalogActions.FETCH_TOPIC_GROUP)
        .switchMap((action: CatalogActions.FetchTopicGroup) => {
            return this.httpClient.get<TopicGroup>(
                'http://localhost:8079/mapapi/api/'.concat('topic-groups/', String(action.payload)),
            {
                observe: 'body',
                responseType: 'json'
            })
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
        .mergeMap((action: CatalogActions.FetchTopic) => {
            return this.httpClient.get<Topic>(
                'http://localhost:8079/mapapi/api/'.concat('topics/', String(action.payload)),
            {
                observe: 'body',
                responseType: 'json'
            })
        })
        .map(
            (topic) => {
                console.log(topic);
                return {
                    type: CatalogActions.APPEND_TOPIC,
                    payload: topic
                }
            }
        );
}