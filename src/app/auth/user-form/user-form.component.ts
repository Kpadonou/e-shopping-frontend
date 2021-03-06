import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/role';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  roles$: Observable<Role[]>;
  form: FormGroup;
  subs = new SubSink();

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.roles$ = this.userService
      .getAllRoles()
      .pipe(
        map((roles) => roles.filter((role) => role.name !== 'ROLE_MODERATOR'))
      );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  initForm() {
    this.form = this.fb.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      roles: [null, Validators.required],
    });
  }

  submit() {
    this.subs.sink = this.userService
      .signUp({ ...this.form.value, roles: [this.roles.value] })
      .subscribe(
        () => {
          this.form.reset();
          this.toastService.showSuccess(
            'Your account has been created successfully'
          );
        },
        () => this.toastService.showError('Error while creating this account')
      );
  }

  clearForm() {
    this.form.reset();
  }

  get username() {
    return this.form.controls['username'];
  }
  get email() {
    return this.form.controls['email'];
  }
  get roles() {
    return this.form.controls['roles'];
  }
  get password() {
    return this.form.controls['password'];
  }
}
