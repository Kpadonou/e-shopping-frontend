import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDetails } from '../models/UserDetails';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login(credentials): Observable<boolean> {
    this.route.snapshot.queryParamMap.get('returnUrl');
    return this.http
      .post(`${environment.apiUrl}/auth/signin`, credentials)
      .pipe(
        map((response: UserDetails) => {
          const result = response;
          if (result && result.accessToken) {
            localStorage.setItem('token', result.accessToken);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loadToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired(); // true or false
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;
    return this.jwtHelper.decodeToken(token);
  }
}
