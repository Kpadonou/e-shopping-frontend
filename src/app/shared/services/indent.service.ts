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
    return this.httpClient.get(`${environment.apiUrl}/indent/id/${id}`);
  }

  public getIndents() {
    return this.httpClient.get(`${environment.apiUrl}/indent/all`);
  }

  public createIndent(indent: Indent) {
    return this.httpClient.post(`${environment.apiUrl}/indent/save`, indent);
  }

  public updateIndent(indent: Indent) {
    return this.httpClient.put(`${environment.apiUrl}/indent/update`, indent);
  }

  public deleteIndent(id: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}/indent/delete/id/${id}`
    );
  }

  async placeOrder(order) {
    /*  let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result; */
  }

  getOrdersByUser(userId: string) {
    /* return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    }); */
  }
}
