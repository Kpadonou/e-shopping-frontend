import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  public getById(id: number): Observable<Category> {
    return this.httpClient.get(`${environment.apiUrl}/categories/${id}`);
    // return this.httpClient.get(`${environment.apiUrl}/test/admin`);
  }

  public getAll() {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  public create(category: Category) {
    return this.httpClient.post(`${environment.apiUrl}/categories`, category);
  }

  public update(category: Category) {
    return this.httpClient.put(
      `${environment.apiUrl}/categories/${category.id}`,
      category
    );
  }

  public delete(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/categories/${id}`);
  }
}
