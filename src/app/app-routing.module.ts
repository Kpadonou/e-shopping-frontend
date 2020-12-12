import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },

  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },

  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard],
  },
  /* {
    path: 'shopping',
    loadChildren: () =>
      import('./shopping/shopping.module').then((m) => m.ShoppingModule),
  }, */
  /* { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login' }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
