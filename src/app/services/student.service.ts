import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url = 'http://localhost:4200/api/student';

  bosses : Student[] = [];

  constructor(private http : HttpClient) {
  }
  getStudents() : Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  getStudent(id: string) : Observable<Student> {
    return this.http.get<Student>(`${this.url}/${id}`);
  }

  postStudent(student: Student) : Observable<Student> {
    return this.http.post<Student>(this.url, student);
  }

  putStudent(student: Student) : Observable<Student> {
    return this.http.put<Student>(`${this.url}`, student);
  }

  deleteStudent(id: string) : Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
