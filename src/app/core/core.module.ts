import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent, HomeComponent],
  imports: [SharedModule, RouterModule.forChild([])],
})
export class CoreModule {}
