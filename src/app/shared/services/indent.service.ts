import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Indent } from '../models/indent';

@Injectable({
  providedIn: 'root',
})
export class IndentService {
  constructor(private httpClient: HttpClient) {}

  public getIndentById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/indents/${id}`);
  }

  public getIndents() {
    return this.httpClient.get(`${environment.apiUrl}/indents`);
  }

  public getIndentsByUser(id: number) {
    return this.httpClient.get<Indent[]>(
      `${environment.apiUrl}/user/${id}/indents`
    );
  }

  public createIndent(indent: Indent) {
    return this.httpClient.post<Indent>(
      `${environment.apiUrl}/indents`,
      indent
    );
  }

  public updateIndent(indent: Indent) {
    return this.httpClient.put(`${environment.apiUrl}/indents`, indent);
  }

  public deleteIndent(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/indents/${id}`);
  }
}
