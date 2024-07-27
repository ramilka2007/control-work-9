export interface Category {
    id: string;
    type: 'income' | 'expense';
    name: string;
}

export type ApiCategory = Omit<Category, 'id'>;

export interface ApiCategories {
    [id: string]: ApiCategory;
}