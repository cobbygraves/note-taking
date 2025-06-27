import { Injectable, signal } from '@angular/core';
import { Error } from '../models/error';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  error = signal<Error | null>(null);

  setMessage(message: Error | null) {
    this.error.set(message);
  }
}
