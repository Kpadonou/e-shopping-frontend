import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Indent } from '../../shared/models/indent';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { AuthService } from '../../shared/services/auth.service';
import { IndentService } from '../../shared/services/indent.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  user$;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private indentService: IndentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.user$ = this.userService.getUserByName(
      this.authService.currentUser.sub
    );
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      addressLine1: [null, Validators.required],
      addressLine2: [null, Validators.required],
      city: [null, Validators.required],
    });
  }

  placeOrder() {
    this.user$.subscribe((user) => {
      let order = new Indent(user, this.form.value, this.cart);
      this.indentService.createIndent(order).subscribe((order) => {
        localStorage.removeItem('cartId');
        this.router.navigate(['/order-success', order.id]);
      });
    });
  }

  get name() {
    return this.form.controls['name'];
  }
  get addressLine1() {
    return this.form.controls['addressLine1'];
  }
  get addressLine2() {
    return this.form.controls['addressLine2'];
  }
  get city() {
    return this.form.controls['city'];
  }
}
