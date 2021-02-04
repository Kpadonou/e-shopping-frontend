import { Product } from './product';
import { ShoppingCart } from './shopping-cart';

export class ShoppingCartItem {
  id: number;
  product: Product;
  quantity: number;
  shoppingCart: ShoppingCart;

  get totalPrice() {
    return this.product.price * this.quantity;
  }
}
