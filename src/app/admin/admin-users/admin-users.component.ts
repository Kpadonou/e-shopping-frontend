import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { SubSink } from 'subsink';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  filteredUsers$: Observable<User[]>;

  userToEdit: User;
  subs = new SubSink();

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.getAll();
    this.filteredUsers$ = this.userService.getAll();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.subs.sink = this.userService.delete(id).subscribe(() => {
      this.toastService.showSuccess('User deleted successfully');
      this.ngOnInit();
    });
  }

  filter(query: string) {
    this.filteredUsers$ = query
      ? this.users$.pipe(
          map((users) =>
            users.filter((p) => p.username.toLowerCase().includes(query))
          )
        )
      : this.users$;
  }

  refresh(newUser: User) {
    this.ngOnInit();
  }

  sendToForm(c) {
    this.userToEdit = c;
  }
}
