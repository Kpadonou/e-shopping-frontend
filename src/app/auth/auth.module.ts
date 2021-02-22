import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, UserFormComponent],
  imports: [SharedModule, RouterModule.forChild([])],
})
export class AuthModule {}
