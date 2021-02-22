import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public getUserByName(username: string) {
    return this.httpClient.get(`${environment.apiUrl}/users/${username}`);
  }

  public getAll() {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/users`);
  }

  public getAllRoles() {
    return this.httpClient.get<Role[]>(`${environment.apiUrl}/roles`);
  }

  public signUp(user: User) {
    return this.httpClient.post<User>(
      `${environment.apiUrl}/auth/signup`,
      user
    );
  }

  public create(user: User) {
    return this.httpClient.post<User>(`${environment.apiUrl}/users`, user);
  }

  public update(user: User) {
    return this.httpClient.put<User>(`${environment.apiUrl}/users`, user);
  }

  public delete(id: number) {
    return this.httpClient.delete<User>(`${environment.apiUrl}/users/${id}`);
  }
}
