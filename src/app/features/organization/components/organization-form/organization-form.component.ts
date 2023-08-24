import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent {
  organizationForm!: FormGroup;

  /**
   * Seats quantities predefined
   */
  seatsQtys = Array.from({ length: 7 }, (_, idx) => (idx ? 5 * idx : 1));

  @Output() readonly formValues = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.organizationForm = this.fb.group({
      municipality: [null, [Validators.required]],
      state: [null, [Validators.required]],
      seats: [null, [Validators.required]]
    });
  }

  emitFormValues(): void {
    if (this.organizationForm.valid) {
      this.formValues.emit(this.organizationForm.value);
    }
  }

  /**
   * Reset form values.
   */
  cancel(): void {
    this.organizationForm.reset();
  }
}
