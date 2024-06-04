import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Student } from './interfaces/student';
import { StudentService } from './services/student.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud-app';

  items = [
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    {
      title: 'Angular Language Service',
      link: 'https://angular.dev/tools/language-service',
    },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ];

  error!: string;
  completed = false;
  students: Student[] = [];

  constructor(private studentService: StudentService) {
    this.studentService.getStudents().subscribe({
      next: data => this.students = data,
      error: err => this.error = err,
      complete: () => this.completed = true,
    });
  }
}
