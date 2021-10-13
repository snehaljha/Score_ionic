import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { AllCategoriesService } from 'src/app/services/all-categories.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {

  categories: Array<Category>;
  constructor(private allCategoriesService: AllCategoriesService) { }

  ngOnInit() {
    this.categories = this.allCategoriesService.fetch().sort(this.categoriesSort);
  }

  private categoriesSort(a: Category, b: Category) {
    if(a.priority > b.priority) {
      return -1;
    }
    if(a.priority < b.priority) {
      return 1;
    }
    return 0;
  }

}
