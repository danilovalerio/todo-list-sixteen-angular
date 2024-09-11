import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { TodoSignalsService } from '../../services/todo-signals.service';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { Todo } from '../../models/model/todo.model';
import { MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { MockProvider } from 'ng-mocks';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let todoSignalsService: TodoSignalsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoFormComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [TodoSignalsService, MockProvider(MatDialogRef)],
    }).compileComponents;

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    todoSignalsService = TestBed.inject(TodoSignalsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Testes de um acionammento de serviço e um signal
  it('should create new todo correctly and call service mthod', () => {
    //jest.spyOn('1param servico ou component de escuta','metodo que iremos espiar')
    jest.spyOn(todoSignalsService, 'updateTodos');
    const newTodo: Todo = {
      id: 1,
      title: 'Nova Todo',
      description: 'Minha todo criada para teste',
      done: false,
    };

    component.handleCreateTodo(newTodo);

    fixture.detectChanges();

    expect(todoSignalsService.updateTodos).toHaveBeenCalledWith(newTodo);
    expect(component.allTodos).toEqual([newTodo]);
  });
});
