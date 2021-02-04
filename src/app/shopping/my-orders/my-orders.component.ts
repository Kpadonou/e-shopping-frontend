import { Component, OnInit } from '@angular/core';
import { Indent } from '../../shared/models/indent';
import { AuthService } from '../../shared/services/auth.service';
import { IndentService } from '../../shared/services/indent.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent {
  orders$: Observable<Indent[]>;

  constructor(
    private authService: AuthService,
    private orderService: IndentService
  ) {
    this.orders$ = this.orderService.getIndentsByUser(
      this.authService.currentUser.user.id
    );
  }
}
