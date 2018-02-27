import { TopicGroup } from '../../shared/topic-group.model';
import { Topic } from '../../shared/topic.model';
import * as CatalogActions from './catalog.actions';


export interface AppState {
    catalog: State;
}

export interface State {
    topicGroup: TopicGroup,
    topics: Topic[]
}

const initialState: State = {
    topicGroup: new TopicGroup(-1, 'placeholder', null, []),
    topics: []
};

export function catalogReducer(state = initialState, action: CatalogActions.CatalogActions) {
    switch (action.type) {
        case CatalogActions.SET_TOPIC_GROUP:
            return {
                ...state,
                topicGroup: action.payload
            };
        case CatalogActions.APPEND_TOPIC:
            const topics: Topic[] = [...state.topics, action.payload];
            return {
                ...state,
                topics: topics
            };
        default:
            return state;
    }
}