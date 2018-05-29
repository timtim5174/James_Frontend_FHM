import { UserInfo } from '../user/user';

export interface Book {
    id: string;
    title: string;
    creationDate?: Date;
    timeFrame: Date;
    rangeEnum: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
}
export interface BookInfo {
    bookName: string;
    members: number;
    users: UserInfo[];
    incomes?: number;
    outgoings?: number;
}
