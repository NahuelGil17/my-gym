import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm!: FormGroup;

  /**
   * Seats quantities predefined
   */
  seatsQtys = Array.from({ length: 7 }, (_, idx) => (idx ? 5 * idx : 1));

  @Output() readonly formValues = new EventEmitter<{ name: string, lastName: string }>();

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    });
  }

  emitFormValues(): void {
    this.formValues.emit(this.userForm.value);
  }

  /**
   * Reset form values.
   */
  cancel(): void {
    this.userForm.reset();
  }
}
