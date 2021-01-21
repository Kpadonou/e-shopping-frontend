import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
    this.filteredProducts$ = this.productService.getAll();
  }

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(id).subscribe(() => {
      this.products$ = this.products$.pipe(
        map((result) => result.filter((product) => product.id !== id))
      );
      alert('Product deleted successfully !');
    });
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
