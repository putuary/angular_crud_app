import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../interfaces/student';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-modal-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-update.component.html',
  styleUrl: './modal-update.component.scss'
})
export class ModalUpdateComponent {
  @Input() modaName: string = '';
  @Input() student: Student = {} as Student;
  @Output() onDataEdit = new EventEmitter<Student>();
  formGroup: FormGroup = new FormGroup({});

  ngOnChanges() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.student.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      nim: new FormControl(this.student.nim, [Validators.required, Validators.maxLength(15)]),
      prodi: new FormControl(this.student.prodi, [Validators.required, Validators.maxLength(20)]),
  })
}

  storeData() {
    console.log(this.formGroup.value); 
    if(!this.formGroup.valid) {
      alert('Please enter a valid input');
      return;
    }
    let data : Student = {
      id: this.student.id,
      ...this.formGroup.value
    } as Student;

    this.onDataEdit.emit(data);
    this.formGroup.reset();
  }
}
