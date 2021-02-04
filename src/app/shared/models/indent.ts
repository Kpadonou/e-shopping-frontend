import { Shipping } from './shipping';
import { ShoppingCart } from './shopping-cart';
import { User } from './user';
export class Indent {
  id?: number;
  datePlaced: number;

  constructor(
    public user: User,
    public shipping: Shipping,
    public shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();
  }
}
