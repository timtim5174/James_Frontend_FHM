export interface Category {
    categoryId: string;
    name: string;
    superCategoryId: string;
    bookId: string;
    paymentFlag: 'A' | 'E';
    presumedAmount?: number;
    creationDate?: Date;
}
