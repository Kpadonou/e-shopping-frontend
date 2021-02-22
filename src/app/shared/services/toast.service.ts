import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  showSuccess(message: string) {
    this.toasts.push({
      textOrTpl: message,
      classname: 'bg-success text-light',
      delay: 7000,
    });
  }

  showError(message: string) {
    this.toasts.push({
      textOrTpl: message,
      classname: 'bg-danger text-light',
      delay: 10000,
    });
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
