import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
  constructor(public items?: ShoppingCartItem[], public id?: number) {}

  getQuantity(product: Product) {
    let item = this.items[product.id];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }
}
