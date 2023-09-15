import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routine } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-create-rutine-form',
  templateUrl: './user-create-rutine-form.component.html',
  styleUrls: ['./user-create-rutine-form.component.scss']
})
export class UserCreateRutineFormComponent implements OnChanges {
  daysOfWeek: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
  userRoutineForm!: FormGroup;
  routines: Routine[] = [];

  @Output() readonly formValues = new EventEmitter<FormGroup>();
  @Input() routineToEdit: any = {};
  constructor(private fb: FormBuilder) {
    this.userRoutineForm = this.fb.group({
      day: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      exercises: [null, [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['routineToEdit'] && this.routineToEdit) {
      // Llena tu formulario con los datos de routineToEdit
      this.userRoutineForm.patchValue({
        day: this.routineToEdit.day,
        endTime: this.routineToEdit.endTime,
        startTime: this.routineToEdit.startTime,
        exercises: this.routineToEdit.exercises
      });
    }
  }

  createRoutine(): void {
    this.formValues.emit(this.userRoutineForm.value);
    this.userRoutineForm.reset();
  }

  /**
   * Reset form values.
   */
  cancel(): void {
    this.userRoutineForm.reset();
  }
}
