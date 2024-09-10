import { Component, OnInit } from '@angular/core';
import { SchoolData, SchoolService } from '../../services/school.service';
import { Observable, zip } from 'rxjs';
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

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.getSchoolDatas();
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
