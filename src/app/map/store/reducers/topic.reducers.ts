import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TopicActionsUnion, TopicActionTypes } from './../actions/topic.actions';
import { TopicGroup } from '@app/shared/models';
import { Topic } from '@app/shared/models/topic.model';

export interface TopicState extends EntityState<Topic> {
    topicGroup: TopicGroup;
}

export const adapter: EntityAdapter<Topic> = createEntityAdapter<Topic>({
    selectId: (topic: Topic) => topic.id,
    sortComparer: false
});

export const initialState: TopicState = adapter.getInitialState({
    topicGroup: null,
});

export function topicReducer(state: TopicState = initialState, action: TopicActionsUnion): TopicState {
    switch (action.type) {
        case TopicActionTypes.SET_TOPIC_GROUP:
            return {
                ...state,
                topicGroup: action.payload
            };
        case TopicActionTypes.APPEND_TOPIC:
            return adapter.addOne(action.payload, state);
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
