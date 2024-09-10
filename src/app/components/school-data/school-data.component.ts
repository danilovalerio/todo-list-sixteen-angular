import { Component, OnInit } from '@angular/core';
import { SchoolData, SchoolService } from '../../services/school.service';
import { from, map, Observable, of, zip } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-school-data',
  standalone: true,
  imports: [],
  templateUrl: './school-data.component.html',
  styleUrl: './school-data.component.scss',
})
export class SchoolDataComponent implements OnInit {
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];

  private zipSchoolResponses$ = zip(
    this.getStudentsDatas(),
    this.getTeachersDatas()
  );

  private ages = of(20, 30, 40, 50, 60, 700);

  //From retorna um array iteravel
  private peopleDatas = from([
    { name: 'Joao', age: 20, profession: 'Analyst System' },
    { name: 'Maria', age: 30, profession: 'UX Design' },
    { name: 'Mateus', age: 40, profession: 'Scrum Master' },
  ]);

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    //this.getSchoolDatas();
    //this.getMultipliedAges();
    this.getPeopleProfessions();
  }

  public getPeopleProfessions(): void {
    this.peopleDatas.pipe(map((item) => item.profession)).subscribe({
      next: (response) => console.log('PROFISSÃO ', response),
    });
  }

  public getMultipliedAges(): void {
    this.ages.pipe(map((age) => age * 2)).subscribe({
      next: (response) => console.log('IDADE MULTIPLICADA', response),
    });
  }

  public getSchoolDatas(): void {
    this.zipSchoolResponses$
      .subscribe({
        next: (response) => {
          console.log('STUDENTS', response[0]);
          console.log('TEACHERS', response[1]);
        },
      })
      .unsubscribe();
  }

  private getStudentsDatas(): Observable<Array<SchoolData>> | any {
    /*console.log('entrou no getStudents');
    setTimeout(() => {
      console.log('chamou o retorno de getStudents');

    }, 2000);*/
    return this.schoolService.getStudents();
  }

  private getTeachersDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }
}
