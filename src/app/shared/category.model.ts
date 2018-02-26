export class Category {
    constructor(
        public id: number,
        public label: string,
        public type: string,
        public layerId: number,
        public categories: Category[]
    ) {}
}