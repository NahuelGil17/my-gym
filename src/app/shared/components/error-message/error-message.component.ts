import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  /** The error message to display. */
  @Input() errorMessage = '';

  /** The title of the error message. */
  @Input() errorTitle = '';

  /** The type of message. */
  @Input() errorType = '';

  /** Event emitter for when the error message is closed. */
  @Output() readonly closeErrorEvt = new EventEmitter<boolean>();

  /**
   * Whether the error message should be enriched with additional information.
   */
  @Input() enriched = false;

  /** Handles the closing of the error message. */
  closeError(): void {
    this.closeErrorEvt.emit(false);
  }
}
