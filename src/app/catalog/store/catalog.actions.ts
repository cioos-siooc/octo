import { Action } from '@ngrx/store';

import { TopicGroup } from '../../shared/topic-group.model';
import { Topic } from '../../shared/topic.model';
import { Category } from '../../shared/category.model';

export const FETCH_TOPIC_GROUP = 'FETCH_TOPIC_GROUP';
export const SET_TOPIC_GROUP = 'SET_TOPIC_GROUP';
export const FETCH_TOPIC = 'FETCH_TOPIC';
export const APPEND_TOPIC = 'APPEND_TOPIC';
export const SET_TOPIC_EXPANDED = 'SET_TOPIC_EXPANDED';
export const FETCH_CATEGORY_HIERARCHY = 'FETCH_CATEGORY_HIERARCHY';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_CATEGORY_EXPANDED = 'SET_CATEGORY_EXPANDED';

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

export class SetTopicExpanded implements Action {
    readonly type = SET_TOPIC_EXPANDED;

    constructor(public payload: {
        topicId: number,
        expanded: boolean
    }) {}
}

export class FetchCategoryHierarchy implements Action {
    readonly type = FETCH_CATEGORY_HIERARCHY;

    constructor(public payload: number) {}
}

export class SetCategories implements Action {
    readonly type = SET_CATEGORIES;

    constructor(public payload: {topicId: number, category: Category}) {}
}

export class SetCategoryExpanded implements Action {
    readonly type = SET_CATEGORY_EXPANDED;

    constructor(public payload: {treeLocation: number[], isExpanded: boolean}) {}
}

export type CatalogActions = 
    FetchTopicGroup |
    SetTopicGroup |
    FetchTopic |
    AppendTopic |
    SetTopicExpanded |
    FetchCategoryHierarchy |
    SetCategories |
    SetCategoryExpanded; 