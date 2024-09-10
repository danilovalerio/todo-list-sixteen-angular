import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * O ZIP aguarda o retorno dos observables, aguardando as chamadas serem finalizadas
 * na ordem que colocamos, e adiciona dentro de um array
 * ASSIM PODEMOS CHAMAR VÁRIOS SERVIÇOS QUE RETORNAM OBSERVABLE
 */

export interface SchoolData {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private students: Array<SchoolData> = [
    { id: '1', name: 'Maria' },
    { id: '2', name: 'Jose' },
    { id: '3', name: 'Paulo' },
  ];

  private teachers: Array<SchoolData> = [
    { id: '1', name: 'Ricardo' },
    { id: '2', name: 'Jesus' },
    { id: '3', name: 'Ismar' },
  ];

  public getStudents(): Observable<Array<SchoolData>> {
    return of(this.students);
  }

  public getTeachers(): Observable<Array<SchoolData>> {
    return of(this.teachers);
  }

  constructor() {}
}
