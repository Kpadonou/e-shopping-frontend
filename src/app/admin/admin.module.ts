import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminAuthGuard } from '../shared/guards/admin-auth.guard';
import { AuthGuard } from '../shared/guards/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminCategoriesComponent,
    AdminUsersComponent,
    ProductFormComponent,
    CategoryFormComponent,
    UserFormComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      /* {
        path: 'admin/categories/new',
        component: CategoryFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: 'admin/categories/:id',
        component: CategoryFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      }, */
      {
        path: 'admin/categories',
        component: AdminCategoriesComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: 'admin/users',
        component: AdminUsersComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
    ]),
  ],
})
export class AdminModule {}
