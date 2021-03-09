import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { MatComponentsModule } from './mat-components/mat-components.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, BsNavbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    ShoppingModule,
    AdminModule,
    SharedModule,
    AppRoutingModule,
    MatComponentsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['localhost:8080', 'e-shopping-backend.herokuapp.com'],
        disallowedRoutes: [
          'http://localhost:8080/api/auth/signin',
          'https://e-shopping-backend.herokuapp.com/api/auth/signin',
        ],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
// ng generate module orders --route orders --module app.module
// 'http://localhost:8080/api/auth/signin',
// 'https://e-shopping-backend.herokuapp.com/api/auth/signin',
