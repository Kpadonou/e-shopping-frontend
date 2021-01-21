import { Product } from './product';
import { ShoppingCart } from './shopping-cart';

export class ShoppingCartItem {
  id: number;
  product: Product;
  quantity: number;
  shoppingCart: ShoppingCart;

  /* constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  } */

  get totalPrice() {
    return this.product.price * this.quantity;
  }
}
