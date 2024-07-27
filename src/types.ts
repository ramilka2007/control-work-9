export interface Category {
    id: string;
    type: string;
    name: string;
}

export type ApiCategory = Omit<Category, 'id'>;

export interface ApiCategories {
    [id: string]: ApiCategory;
}

export interface Transaction {
    id: string;
    name: string;
    transactionSum: number;
    type: string;
    category: string;
    date: string;
}

export interface ApiTransaction {
    transactionSum: number;
    type?: string;
    category: string;
    date: string;
}

export interface ApiTransactions {
    [id: string]: Transaction;
}