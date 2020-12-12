import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent {
  constructor(public authService: AuthService) {}
  logout() {
    this.authService.logout();
  }
}
