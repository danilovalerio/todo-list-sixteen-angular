import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoSignalsService {
  public todosState = signal<Array<Todo>>([]);
}
