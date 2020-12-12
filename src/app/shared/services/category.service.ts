import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  public getCategoryById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/category/id/${id}`);
  }

  public getCategories() {
    return this.httpClient.get<Category[]>(
      `${environment.apiUrl}/category/all`
    );
  }

  public createCategory(category: Category) {
    return this.httpClient.post(
      `${environment.apiUrl}/category/save`,
      category
    );
  }

  public updateCategory(category: Category) {
    return this.httpClient.put(
      `${environment.apiUrl}/category/update`,
      category
    );
  }

  public deleteCategory(id: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}/category/delete/id/${id}`
    );
  }
}
