import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public getUserById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/user/id/${id}`);
  }

  public getUsers() {
    return this.httpClient.get(`${environment.apiUrl}/user/all`);
  }

  public createUser(user: User) {
    return this.httpClient.post(`${environment.apiUrl}/user/save`, user);
  }

  public updateUser(user: User) {
    return this.httpClient.put(`${environment.apiUrl}/user/update`, user);
  }

  public deleteUser(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/user/delete/id/${id}`);
  }
}
