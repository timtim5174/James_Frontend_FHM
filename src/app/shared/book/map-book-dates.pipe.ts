import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book';

@Pipe({
  name: 'mapBookDates'
})
export class MapBookDatesPipe implements PipeTransform {

  transform(book: Book): Book {
    const mappedDates = {
      timeFrame: new Date(book.timeFrame),
      creationDate: new Date(book.creationDate)
    };
    const result = { ...book, ...mappedDates };
    return result;
  }

}
