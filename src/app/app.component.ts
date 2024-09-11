import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolDataComponent } from './components/school-data/school-data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    TodoCardComponent,
    SchoolDataComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @Input() public projectName!: string;
  @Output() public outputEvent = new EventEmitter<string>();

  title = 'todo-list-sixteen';

  public handleEmitEvent(): void {
    this.outputEvent.emit();
  }
}
