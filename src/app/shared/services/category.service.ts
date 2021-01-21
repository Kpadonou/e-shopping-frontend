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

  public getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get(`${environment.apiUrl}/categories/id/${id}`);
    // return this.httpClient.get(`${environment.apiUrl}/test/admin`);
  }

  public getAll() {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  public createCategory(category: Category) {
    return this.httpClient.post(
      `${environment.apiUrl}/categories/save`,
      category
    );
  }

  public updateCategory(category: Category) {
    return this.httpClient.put(
      `${environment.apiUrl}/categories/update`,
      category
    );
  }

  public deleteCategory(id: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}/categories/delete/id/${id}`
    );
  }
}
