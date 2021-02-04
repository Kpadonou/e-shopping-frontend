import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

@NgModule({
  declarations: [ProductCardComponent, ProductQuantityComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,

    CommonModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
