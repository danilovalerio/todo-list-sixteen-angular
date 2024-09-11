import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { first } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //para acionar o ngInit
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'todo-list-sixteen' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('todo-list-sixteen');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('To-do List');
  });

  // Teste de @Input()
  it('should set @Input() property correctly', () => {
    component.projectName = 'Teste Angular com Jest';

    //chama o ciclo de vida de alteração do angular para detectar as alterações
    fixture.detectChanges();

    expect(component.projectName).toEqual('Teste Angular com Jest');
  });

  //Teste de @Output() e @Input()
  it('should emit event with decorator correctly', () => {
    component.projectName = 'Teste Angular com Jest 2';

    //manipular observable
    component.outputEvent
      .pipe(
        //pega primeiro item do nosso observable
        first()
      )
      .subscribe({
        next: (evento) => {
          expect(evento).toEqual('Teste Angular com Jest 2');
          component.handleEmitEvent();
        },
      });
  });
});
