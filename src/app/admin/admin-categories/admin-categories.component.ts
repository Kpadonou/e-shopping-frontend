import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;
  filteredCategories$: Observable<Category[]>;

  categoryToEdit: Category;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
    this.filteredCategories$ = this.categoryService.getAll();
  }

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this category?')) return;
    this.categoryService.delete(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  filter(query: string) {
    this.filteredCategories$ = query
      ? this.categories$.pipe(
          map((categories) =>
            categories.filter((p) => p.name.toLowerCase().includes(query))
          )
        )
      : this.categories$;
  }

  refresh(newCategory: Category) {
    this.ngOnInit();
  }

  sendToForm(c) {
    this.categoryToEdit = c;
  }
}
