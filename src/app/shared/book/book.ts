export interface Book {
    id: string;
    title: string;
    timeFrame: string;
    rangeEnum: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
}
