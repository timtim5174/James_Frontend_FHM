export interface Book {
    id: string;
    title: string;
    creationDate?: Date;
    timeFrame: Date;
    rangeEnum: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
}
