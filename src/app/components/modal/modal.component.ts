import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() modaName: string = '';
  @Output() onData = new EventEmitter<Student>();

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    nim: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    prodi: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  })

  storeData() {
    if(!this.formGroup.valid) {
      alert('Please enter a valid input');
      return;
    }
    let data : Student = {
      id: uuidv4(),
      ...this.formGroup.value
    } as Student;

    this.onData.emit(data);
    this.formGroup.reset();
  }
}
