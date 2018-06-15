export interface Transaction {
    id: string;
    title: string;
    comment: string;
    bookId: string;
    categoryId: string;
    amount: number;
    creationDate?: Date;
    timeFrame: Date;
    rangeEnum: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
    userId?: string;
}
