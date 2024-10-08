import { Todo } from './../../models/model/todo.model';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoSignalsService } from '../../services/todo-signals.service';
import { TodoKeyLocalStorage } from '../../models/enum/todoKeyLocalStorage';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent implements OnInit {
  private todoSignalsService = inject(TodoSignalsService);
  private todosSignal = this.todoSignalsService.todosState; //aqui contém o array de todos
  //computed para usarmos o valores computados, que depende dos valores de outro signal, por exemplo o signal que está no state, assim atualiza automaticamente
  public todosList = computed(() => this.todosSignal());

  constructor() {
    effect(() => {
      console.log(
        'SIGNAL FOI ATUALIZADO',
        this.todoSignalsService.todosState()
      );
    });
  }

  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage(): void {
    const todosDatas = localStorage.getItem(
      TodoKeyLocalStorage.TODO_LIST
    ) as string;

    todosDatas && this.todosSignal.set(JSON.parse(todosDatas));
  }

  private saveTodosInLocalStorage(): void {
    this.todoSignalsService.saveTodosInLocalStorage();
  }

  public handleDoneTodo(todoId: number) {
    const updatedData = this.todosList().map((todo) =>
      todo.id === todoId ? { ...todo, done: true } : todo
    );

    if (todoId) {
      this.todosSignal.set(updatedData);
      this.saveTodosInLocalStorage();
    }
  }

  public handleDeleteTodo(todo: Todo): void {
    if (todo) {
      const index = this.todosList().indexOf(todo);

      if (index !== -1) {
        this.todosSignal.set(this.todosList().splice(index, 1));
        this.saveTodosInLocalStorage();
      }

      if (index === 0) {
        const obj_empty = {} as Todo[];
        this.todosSignal.set(obj_empty);
        this.saveTodosInLocalStorage();
      }
    }
  }
}
