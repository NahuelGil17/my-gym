import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * The NotificationsFormComponent displays a form that allows users to configure their notification settings.
 */
@Component({
  selector: 'app-notifications-form',
  templateUrl: './notifications-form.component.html',
  styleUrls: ['./notifications-form.component.css']
})
export class NotificationsFormComponent implements OnInit {
  /** The notification form. */
  notificationForm!: FormGroup;

  /**
   * Creates a new instance of the NotificationsFormComponent.
   * @param fb The FormBuilder service.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    // Create the notification form with realTime and systemUpdates fields
    this.notificationForm = this.fb.group({
      realTime: [false, [Validators.required]],
      systemUpdates: [false, [Validators.required]]
    });
  }
}
