/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TopicActionsUnion, TopicActionTypes } from './../actions/topic.actions';
import { TopicGroup } from '@app/shared/models';
import { Topic } from '@app/shared/models/topic.model';

export interface TopicState extends EntityState<Topic> {
    topicGroup: TopicGroup;
    selectedTopic: Topic;
}

export const adapter: EntityAdapter<Topic> = createEntityAdapter<Topic>({
    selectId: (topic: Topic) => topic.id,
    sortComparer: false
});

export const initialState: TopicState = adapter.getInitialState({
    topicGroup: null,
    selectedTopic: null
});

export function topicReducer(state: TopicState = initialState, action: TopicActionsUnion): TopicState {
    switch (action.type) {
        case TopicActionTypes.SET_TOPIC_GROUP:
            return {
                ...state,
                topicGroup: action.payload
            };
        case TopicActionTypes.SET_SELECTED_TOPIC:
            return {
                ...state,
                selectedTopic: action.payload
            };
        case TopicActionTypes.APPEND_TOPIC:
            return adapter.addOne(action.payload, state);
        case TopicActionTypes.UPDATE_TOPIC:
            return adapter.updateOne(action.payload, state);
        default:
            return state;
    }
}

export const {
    selectIds: selectTopicIds,
    selectEntities: selectTopicEntities,
    selectAll: selectAllTopics,
    selectTotal: selectTopicsTotal,
} = adapter.getSelectors();
