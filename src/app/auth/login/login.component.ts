import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  signIn() {
    this.authService.login(this.loginForm.value).subscribe((resp) => {
      if (resp) {
        console.log(resp);

        // this.router.navigate(['/core']);
      } else {
        // this.invalidLogin = true;
      }
    });
  }
}
