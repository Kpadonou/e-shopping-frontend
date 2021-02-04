import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
  constructor(public items?: ShoppingCartItem[], public id?: number) {}

  get totalPrice() {
    let sum = 0;
    for (let item of this.items) sum += item.quantity * item.product.price;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let item of this.items) count += item.quantity;
    return count;
  }

  getQuantityPerItem(product: Product) {
    const item = this.items.find((item) => item.product.id === product?.id);
    return item ? item.quantity : 0;
  }
}
