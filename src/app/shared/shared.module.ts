import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ToastsContainer } from './components/toasts-container.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    ToastsContainer,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    ToastsContainer,

    CommonModule,
    ReactiveFormsModule,
    NgbModule,
  ],
})
export class SharedModule {}
