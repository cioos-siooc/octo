import {cloneDeep} from 'lodash';

import {Category} from '@app/shared/models';
import {Topic} from '@app/shared/models';

export default class Utils {
  static getCategory(category: Category, treeLocation): Category {
    const treeLoc = [...treeLocation];
    if (treeLocation.length <= 1) {
      return category.categories[treeLoc.shift()];
    } else {
      return this.getCategory(
        category.categories[treeLoc.shift()],
        treeLoc
      );
    }
  }

  static setCategory(startingCategory: Category, treeLocation: number[], newCategory: Category) {
    const categoryClone = cloneDeep(startingCategory);
    const categoryToUpdate = this.getCategory(categoryClone, treeLocation);
    Object.assign(categoryToUpdate, newCategory);
    return categoryClone;
  }

  static updateCategory(state, treeLocation, newCategory) {
    const treeLoc = [...treeLocation];
    const topicId = treeLoc.shift();
    const topicToUpdate: Topic = {...state.topics[topicId]};
    const updatedCategory: Category = Utils.setCategory(
      topicToUpdate.category,
      treeLoc,
      newCategory
    );
    topicToUpdate.category = updatedCategory;
    const updatedTopicList = [...state.topics];
    updatedTopicList[topicId] = topicToUpdate;
    return updatedTopicList;
  }
}
