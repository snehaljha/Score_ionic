import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Contants } from '../models/contants';

@Injectable({
  providedIn: 'root'
})
export class AllCategoriesService {

  constructor(private http: HttpClient) { }

  fetch() {
    const response = this.http.get(Contants.host + Contants.categories);
    const categories = new Array<Category>();
    response.subscribe(data => {
      const newLocal = 'categories';
      const parsed = data[newLocal];
      // eslint-disable-next-line guard-for-in
      for(const i in parsed) {
        categories.push(new Category(parsed[i]));
      }
      categories.sort((a: Category, b: Category) => {
        if(a.priority > b.priority) {
          return -1;
        }
        if(a.priority < b.priority) {
          return 1;
        }
        return 0;
      });
    });
    return categories;
  }
}
