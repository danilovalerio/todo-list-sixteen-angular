import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoSignalsService {
  public todosState = signal();
}
