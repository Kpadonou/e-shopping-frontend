import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
