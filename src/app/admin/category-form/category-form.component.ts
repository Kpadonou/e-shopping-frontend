import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit, OnChanges, OnDestroy {
  categories$: Observable<Category[]>;
  category: Category;
  subs = new SubSink();
  @Output()
  onNewCategory: EventEmitter<Category> = new EventEmitter<Category>();
  @Input() categoryToEdit: Category;

  form: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.categoryToEdit.currentValue) return;
    this.form.patchValue({
      ...(changes.categoryToEdit.currentValue as Category),
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  submit() {
    this.categoryToEdit ? this.update() : this.create();
  }

  update() {
    this.subs.sink = this.categoryService
      .update({ ...this.categoryToEdit, ...this.form.value })
      .pipe(take(1))
      .subscribe(
        (resp) => {
          this.categoryToEdit = null;
          this.onNewCategory.emit(resp);
          this.toastService.showSuccess('Category updated successfully');
          this.ngOnInit();
        },
        () => this.toastService.showError('Error while updating this category')
      );
  }

  create() {
    this.subs.sink = this.categoryService.create(this.form.value).subscribe(
      (category) => {
        this.onNewCategory.emit(category);
        this.toastService.showSuccess('Category created successfully');
      },
      () => this.toastService.showError('Error while creating this category')
    );
  }

  clearForm() {
    this.form.reset();
    this.categoryToEdit = null;
  }

  get name() {
    return this.form.controls['name'];
  }
}
