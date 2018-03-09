import {Category} from './category.model';

export class TopicHierarchy {
  constructor(public id: number,
              public code: string,
              public languageCode: string,
              public root: Category) {
  }
}
