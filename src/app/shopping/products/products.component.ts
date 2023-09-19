import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  categoryId: number;
  subs = new SubSink();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
    this.filteredProducts$ = this.productService.getAll();
    this.subs.sink = this.route.queryParamMap.subscribe((params) => {
      this.categoryId = +params.get('category');
      this.filteredProducts$ = this.categoryId
        ? this.products$.pipe(
            map((products) =>
              products.filter((p) => p.category.id === this.categoryId)
            )
          )
        : this.products$;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
