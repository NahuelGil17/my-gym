import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create-rutine-form',
  templateUrl: './user-create-rutine-form.component.html',
  styleUrls: ['./user-create-rutine-form.component.scss']
})
export class UserCreateRutineFormComponent {
  userRoutineForm!: FormGroup;
  routines: { day: string, startTime: string, endTime: string, exercises: string[] }[] = [];

  /**
   * Seats quantities predefined
   */
  seatsQtys = Array.from({ length: 7 }, (_, idx) => (idx ? 5 * idx : 1));

  @Output() readonly formValues = new EventEmitter<{ day: string, endTime: string, startTime: string, exercises: string[] }>();

  constructor(private fb: FormBuilder) {
    this.userRoutineForm = this.fb.group({
      day: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      exercises: [null, [Validators.required]],
    });
  }


  emitFormValues(): void {
    this.formValues.emit(this.userRoutineForm.value);
  }

  createRoutine() {
    const formData = this.userRoutineForm.value;

    console.log(formData);

    this.formValues.emit(formData);
    this.routines.push(formData);
    this.userRoutineForm.reset();
  }

  /**
   * Reset form values.
   */
  cancel(): void {
    this.userRoutineForm.reset();
  }
}
