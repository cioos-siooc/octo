import { Category } from "./category.model";

export class Topic {
    constructor(
        public id: number,
        public root: Category,
        public code: string,
        public languageCode: string
    ) {}
}