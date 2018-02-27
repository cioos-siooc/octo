import { Action } from '@ngrx/store';

import { TopicGroup } from '../../shared/topic-group.model';
import { Topic } from '../../shared/topic.model';

export const FETCH_TOPIC_GROUP = 'FETCH_TOPIC_GROUP';
export const SET_TOPIC_GROUP = 'SET_TOPIC_GROUP';
export const FETCH_TOPIC = 'FETCH_TOPIC';
export const APPEND_TOPIC = 'APPEND_TOPIC';

export class FetchTopicGroup implements Action {
    readonly type = FETCH_TOPIC_GROUP;

    constructor(public payload: number) {}
}

export class SetTopicGroup implements Action {
    readonly type = SET_TOPIC_GROUP;

    constructor(public payload: TopicGroup) {}
}

export class FetchTopic implements Action {
    readonly type = FETCH_TOPIC;

    constructor(public payload: number) {}
}

export class AppendTopic implements Action {
    readonly type = APPEND_TOPIC;

    constructor(public payload: Topic) {}
}

export type CatalogActions = 
    FetchTopicGroup |
    SetTopicGroup |
    FetchTopic |
    AppendTopic;