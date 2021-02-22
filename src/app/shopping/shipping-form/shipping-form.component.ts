import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Indent } from '../../shared/models/indent';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { AuthService } from '../../shared/services/auth.service';
import { IndentService } from '../../shared/services/indent.service';
import { UserService } from '../../shared/services/user.service';
import { SubSink } from 'subsink';
import { TotalItemNotifierService } from 'src/app/shared/services/total-item-notifier.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  user$;
  form: FormGroup;
  subs = new SubSink();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private indentService: IndentService,
    private router: Router,
    private totalItemNotifierService: TotalItemNotifierService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.user$ = this.userService.getUserByName(
      this.authService.currentUser.sub
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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
    this.subs.sink = this.user$.subscribe((user) => {
      let order = new Indent(user, this.form.value, this.cart);
      this.indentService.createIndent(order).subscribe((order) => {
        localStorage.removeItem('cartId');
        // Reset total item in navbar
        this.totalItemNotifierService.changeSubject.next(2);
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
