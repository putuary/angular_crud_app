import { Component } from '@angular/core';
import { Student } from '../../interfaces/student';
import { StudentService } from '../../services/student.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalUpdateComponent } from '../modal-update/modal-update.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ModalComponent, ModalUpdateComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  error!: string;
  completed = false;
  students: Student[] = [];
  studentId: string = '';
  student: Student = {} as Student;

  
  constructor(private studentService: StudentService) {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe({
      next: data => this.students = data,
      error: err => this.error = err,
      complete: () => this.completed = true,
    });
  }

  getData($event: Student) {
    this.studentService.postStudent($event).subscribe({
      next: data => console.log('data' + data),
      error: err => console.log('error' + err)
    })
    this.getStudents();
  }

  getDataEdit($event: Student) {
    this.studentService.putStudent($event).subscribe({
      next: data => console.log('data' + data),
      error: err => console.log('error' + err)
    })
    this.getStudents();
  }

  getStudentId(id: string) {
    this.studentService.getStudent(id).subscribe({
      next: data => this.student = data,
      error: err => console.log(err)
    })
  }

  deleteStudent(id: string) {
    console.log(id);
    this.studentService.deleteStudent(id).subscribe({
      next: data => console.log('data' + data),
      error: err => console.log('error' + err)
    })
    this.getStudents();
  }
}
