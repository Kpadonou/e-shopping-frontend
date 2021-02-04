import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

import { Category } from '../../../shared/models/category';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent {
  categories$: Observable<Category[]>;
  @Input('categoryId') categoryId: number;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }
}
