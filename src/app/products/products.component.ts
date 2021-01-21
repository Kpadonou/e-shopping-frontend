import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../shared/models/product';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { ProductService } from '../shared/services/product.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  categoryId: number;
  shoppingCart: ShoppingCart;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
    this.filteredProducts$ = this.productService.getAll();
    this.route.queryParamMap.subscribe((params) => {
      this.categoryId = +params.get('category');
      this.filteredProducts$ = this.categoryId
        ? this.products$.pipe(
            map((products) =>
              products.filter((p) => p.category.id === this.categoryId)
            )
          )
        : this.products$;
    });
    // Get ShoppingCart
    this.cartService.getOrCreateCart().subscribe((cart) => {
      this.cartService.getItemsOfCart(cart.id).subscribe((items) => {
        let c = cart;
        c.items = items;
        this.shoppingCart = c;
      });
    });
  }
}
