import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit, OnChanges {
  categories$: Observable<Category[]>;
  category: Category;

  @Output()
  onNewCategory: EventEmitter<Category> = new EventEmitter<Category>();
  @Input() categoryToEdit: Category;

  form: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log();

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

  submit() {
    this.categoryToEdit ? this.update() : this.create();
  }

  update() {
    this.categoryService
      .update({ ...this.categoryToEdit, ...this.form.value })
      .pipe(take(1))
      .subscribe((resp) => {
        this.categoryToEdit = null;
        this.onNewCategory.emit(resp);
        this.ngOnInit();
      });
  }

  create() {
    this.categoryService.create(this.form.value).subscribe((category) => {
      this.onNewCategory.emit(category);
    });
  }

  clearForm() {
    this.form.reset();
    this.categoryToEdit = null;
  }

  get name() {
    return this.form.controls['name'];
  }
}
