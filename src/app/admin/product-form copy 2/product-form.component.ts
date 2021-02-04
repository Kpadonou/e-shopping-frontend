import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<Category[]>;
  product: Product;

  form: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
    this.form = this.fb.group({
      title: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
      imageUrl: [null, [Validators.required, CustomValidators.url]],
    });
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

  save() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.productService
        .update({ ...this.product, ...this.form.value })
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(['admin/products']);
        });
    } else {
      this.productService.create(this.form.value).subscribe((product) => {
        this.router.navigate(['admin/products']);
      });
    }
  }

  delete() {
    if (!this.route.snapshot.paramMap.has('id')) return;
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.product.id).subscribe(() => {
      // this.router.navigate(['admin/products']);
    });
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
