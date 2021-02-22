import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  filteredUsers$: Observable<User[]>;
  subs = new SubSink();

  userToEdit: User;
  constructor(private userService: UserService) {}

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
