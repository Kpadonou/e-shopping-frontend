import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  form: FormGroup;
  cart$: Observable<ShoppingCart>;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.getOrCreateCart();
  }
}
