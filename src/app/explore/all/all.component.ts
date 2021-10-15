import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { AllCategoriesService } from 'src/app/services/all-categories.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {

  categories: Array<Category>;
  constructor(private allCategoriesService: AllCategoriesService, private router: Router) { }

  ngOnInit() {
    this.categories = this.allCategoriesService.fetch();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  onClick(category: Category) {
    const navigationExtras: NavigationExtras = {state: {category}};
    this.router.navigate(['league-list'], navigationExtras);
  }

}
