import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * This is a component that displays a file card.
 */
@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent {
  /**
   * The file to display in the card.
   */
  @Input() file!: File | null;

  /**
   * Whether the file was uploaded successfully.
   */
  @Input() success!: boolean;

  /**
   * An event that is emitted when the remove button is clicked.
   */
  @Output() readonly remove = new EventEmitter<File>();

  /**
   * Removes the specified file.
   * @param {File} file The file to remove.
   */
  removeFile(file: File): void {
    this.remove.emit(file);
  }
}
