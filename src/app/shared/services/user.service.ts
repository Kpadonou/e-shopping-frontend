import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public getUserByName(username: string) {
    return this.httpClient.get(`${environment.apiUrl}/users/${username}`);
  }

  public getUsers() {
    return this.httpClient.get(`${environment.apiUrl}/users/all`);
  }

  public createUser(user: User) {
    return this.httpClient.post(`${environment.apiUrl}/users/save`, user);
  }

  public updateUser(user: User) {
    return this.httpClient.put(`${environment.apiUrl}/users/update`, user);
  }

  public deleteUser(id: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}/users/delete/id/${id}`
    );
  }
}
