import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routine } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-create-rutine-form',
  templateUrl: './user-create-rutine-form.component.html',
  styleUrls: ['./user-create-rutine-form.component.scss']
})
export class UserCreateRutineFormComponent {
  userRoutineForm!: FormGroup;
  routines: Routine[] = [];

  @Output() readonly formValues = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {
    this.userRoutineForm = this.fb.group({
      day: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      exercises: [null, [Validators.required]]
    });
  }

  createRoutine(): void {
    this.formValues.emit(this.userRoutineForm);
  }

  /**
   * Reset form values.
   */
  cancel(): void {
    this.userRoutineForm.reset();
  }
}
