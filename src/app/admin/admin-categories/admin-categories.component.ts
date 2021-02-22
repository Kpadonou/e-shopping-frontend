import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';
import { SubSink } from 'subsink';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  filteredCategories$: Observable<Category[]>;

  categoryToEdit: Category;
  constructor(
    private categoryService: CategoryService,
    private toastService: ToastService
  ) {}

  subs = new SubSink();

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
    this.filteredCategories$ = this.categoryService.getAll();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this category?')) return;
    this.subs.sink = this.categoryService.delete(id).subscribe(
      () => {
        this.ngOnInit();
        this.toastService.showSuccess('Category deleted successfully');
      },
      () => this.toastService.showError('Error while deleting category')
    );
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
