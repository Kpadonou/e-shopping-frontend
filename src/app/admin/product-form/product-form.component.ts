import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { take } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  product: Product;
  subs = new SubSink();

  form: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
    this.form = this.fb.group({
      title: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
      imageUrl: [null, [Validators.required, Validators.maxLength(255)]],
    }); // , CustomValidators.url
    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.productService
        .getById(+id)
        .pipe(take(1))
        .subscribe((p) => {
          this.product = p;
          this.form.patchValue({ ...this.product });
        });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  save() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.productService
        .update({ ...this.product, ...this.form.value })
        .pipe(take(1))
        .subscribe(
          () => {
            this.toastService.showSuccess('Product updated successfully');
            this.router.navigate(['admin/products']);
          },
          () => this.toastService.showError('Error while updating product')
        );
    } else {
      this.subs.sink = this.productService.create(this.form.value).subscribe(
        () => {
          this.toastService.showSuccess('Product created successfully');
          this.router.navigate(['admin/products']);
        },
        () => this.toastService.showError('Error while creating product')
      );
    }
  }

  delete() {
    if (!this.route.snapshot.paramMap.has('id')) return;
    if (!confirm('Are you sure you want to delete this product?')) return;
    (this.subs.sink = this.productService
      .delete(this.product.id)
      .subscribe(() =>
        this.toastService.showSuccess('Product removed successfully')
      )),
      () => this.toastService.showError('Error while removing this product');
  }

  compareFn(obj1: any, obj2: any): boolean {
    return obj1 && obj2 && obj1.id === obj2.id;
  }

  get title() {
    return this.form.controls['title'];
  }
  get price() {
    return this.form.controls['price'];
  }
  get category() {
    return this.form.controls['category'];
  }
  get imageUrl() {
    return this.form.controls['imageUrl'];
  }
}
