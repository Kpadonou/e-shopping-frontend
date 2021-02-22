import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SubSink } from 'subsink';

import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  subs = new SubSink();
  constructor(
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
    this.filteredProducts$ = this.productService.getAll();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.subs.sink = this.productService.delete(id).subscribe(
      () => {
        this.ngOnInit();
        this.toastService.showSuccess('Product deleted successfully');
      },
      () => {
        this.toastService.showError('Error while removing product');
      }
    );
  }

  filter(query: string) {
    this.filteredProducts$ = query
      ? this.products$.pipe(
          map((products) =>
            products.filter((p) => p.title.toLowerCase().includes(query))
          )
        )
      : this.products$;
  }
}
