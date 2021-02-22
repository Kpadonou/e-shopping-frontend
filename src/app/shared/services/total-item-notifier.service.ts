import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TotalItemNotifierService {
  public changeSubject: BehaviorSubject<number>;
  public change$: Observable<number>;

  constructor() {
    this.changeSubject = new BehaviorSubject<number>(0);
    this.change$ = this.changeSubject.asObservable();
  }
}
