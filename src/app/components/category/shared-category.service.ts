import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class SharedCategoryService {
  categorys = new BehaviorSubject<Category[]>(null);

  constructor() { }

  setCategorys(categorys: Category[]) {
    this.categorys.next(categorys);
  }

  getCategorys(): Observable<Category[]> {
    return this.categorys.asObservable();
  }

}
