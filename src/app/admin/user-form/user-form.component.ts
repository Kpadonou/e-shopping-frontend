import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/role';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { SubSink } from 'subsink';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnChanges, OnDestroy {
  users$: Observable<User[]>;
  user: User;
  roles$: Observable<Role[]>;
  subs = new SubSink();

  @Output()
  onNewUser: EventEmitter<User> = new EventEmitter<User>();
  @Input() userToEdit: User;

  form: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.userToEdit.currentValue) return;
    this.form.patchValue({
      ...(changes.userToEdit.currentValue as User),
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.roles$ = this.userService.getAllRoles();
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
    console.log(this.form);

    this.userToEdit ? this.update() : this.create();
  }

  update() {
    this.userService
      .update({ ...this.userToEdit, ...this.form.value })
      .pipe(take(1))
      .subscribe((resp) => {
        this.userToEdit = null;
        this.onNewUser.emit(resp);
        this.ngOnInit();
      });
  }

  create() {
    this.subs.sink = this.userService
      .create({ ...this.form.value, roles: [this.roles.value] })
      .subscribe((user) => {
        this.onNewUser.emit(user);
      });
  }

  clearForm() {
    this.form.reset();
    this.userToEdit = null;
  }

  compareFn(obj1: any, obj2: any): boolean {
    return obj1 && obj2 && obj1.id === obj2.id;
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
