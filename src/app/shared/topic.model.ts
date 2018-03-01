import { Category } from "./category.model";

export class Topic {
    constructor(
        public id: number,
        public root: number,
        public category: Category,
        public code: string,
        public languageCode: string,
        public expanded: boolean
    ) {}
}