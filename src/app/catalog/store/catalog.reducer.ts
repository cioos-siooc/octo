import { TopicGroup } from '../../shared/topic-group.model';
import { Topic } from '../../shared/topic.model';
import * as CatalogActions from './catalog.actions';
import Utils from '../utilities/traverse-category.util';
import { Category } from '../../shared/category.model';


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
        case CatalogActions.SET_TOPIC_EXPANDED: 
            const topic: Topic = {...state.topics[action.payload.topicId]};
            topic.expanded = action.payload.expanded;

            const oldTopics: Topic[] = [...state.topics]
            oldTopics[action.payload.topicId] = topic;
            return {
                ...state,
                topics: oldTopics
            };
        case CatalogActions.SET_CATEGORIES:
            let idToUpdate = -1
            for (var i = 0; i < state.topics.length; i++) {
                if (state.topics[i].id === action.payload.topicId) {
                    idToUpdate = i;
                    break;
                }
            }
            const updatedTopic: Topic = {
                ...state.topics[idToUpdate],
                category: action.payload.category
            }
            const updatedTopics: Topic[] = [...state.topics];
            updatedTopics[idToUpdate] = updatedTopic;
            return {
                ...state,
                topics: updatedTopics
            };
        case CatalogActions.UPDATE_CATEGORY:
            let treeLoc = [...action.payload.treeLocation];
            let topicId = treeLoc.shift();
            let topicToUpdate: Topic = {...state.topics[topicId]};
            const updatedCategory: Category = Utils.setCategory(
                topicToUpdate.category, 
                treeLoc, 
                action.payload.newCategory
            );
            topicToUpdate.category = updatedCategory;
            let updatedTopicList = [...state.topics];
            updatedTopicList[topicId] = topicToUpdate;
            return {
                ...state,
                topics: updatedTopicList
            };
        default:
            return state;
    }
}