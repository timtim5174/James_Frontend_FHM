import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from './transaction';

@Pipe({
  name: 'mapTransactionDates'
})
export class MapTransactionDatesPipe implements PipeTransform {

  transform(transaction: Transaction): Transaction {
    const mappedDates = {
      timeFrame: new Date(transaction.timeFrame),
      creationDate: new Date(transaction.creationDate)
    };
    const result = { ...transaction, ...mappedDates };
    return result;
  }

}
