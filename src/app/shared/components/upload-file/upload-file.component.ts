import { Component, EventEmitter, forwardRef, Inject, INJECTOR, Injector, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { RemoveFileEvt } from '../../interfaces/documents.interface';

/**
 * Component for uploading a file.
 * @implements ControlValueAccessor
 * @implements OnInit
 */
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true
    }
  ]
})
export class UploadFileComponent implements ControlValueAccessor, OnInit {
  /**
   * The control for the upload file component.
   */
  control!: NgControl;
  /**
   * The file to upload.
   */
  file!: File | null;
  /**
   * A boolean indicating whether the upload file component has an error or not.
   */
  hasError = false;
  /**
   * The error message for the upload file component.
   */
  errorMessage = '';
  /**
   * The error title for the upload file component.
   */
  errorTitle = '';
  /**
   * An array of files to upload.
   */
  files: File[] = [];

  /**
   * Whether the file input control allows multiple files to be selected.
   */
  @Input() allowMultiple = false;

  /**
   * The restricted file formats
   */
  @Input() restrictedFormats!: string[];

  /** The allowed file formats. */
  @Input() allowedFormats!: string[];

  /**
   *  Event emitter for when the user remove a file.
   */
  @Output() readonly removeFileEvt = new EventEmitter<RemoveFileEvt>();

  /** The onChange function for ControlValueAccessor. */
  onChange: any = () => {
    /* TODO document why this method 'onChange' is empty */
  };

  /** The onTouch function for ControlValueAccessor. */
  onTouch: any = () => {
    /* TODO document why this method 'onTouch' is empty */
  };

  /**
   * Creates an instance of UploadFileComponent.
   * @param injector - The Injector instance.
   */
  constructor(@Inject(INJECTOR) private injector: Injector) {}

  /** Initializes the component. */
  ngOnInit(): void {
    this.control = this.injector.get(NgControl);
  }

  /**
   * Writes a new value to the file.
   * @param obj - The new value to write.
   */
  writeValue(obj: any): void {
    this.file = obj;
  }

  /**
   * Registers a callback function to call when the value changes.
   * @param fn - The callback function to register.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function to call when the control is touched.
   * @param fn - The callback function to register.
   */
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  /**
   * Handles the file upload event.
   * @param event - The file upload event.
   * @param {boolean} drop - Flag to indicate if the file was dropped.
   */
  uploadFile(event: any, drop: boolean): void {
    this.hasError = false;

    let files = drop ? event : event.target.files;
    files = Array.from(files);
    const isRestricted = files.some((file: File) => {
      return this.restrictedFormats.includes(file.type);
    });

    if (!isRestricted && files.length > 0) {
      if (this.allowMultiple) {
        if (this.files.length + files.length > 2) {
          this.hasError = true;
          this.errorTitle = 'Maximum files exceeded';
          this.errorMessage = 'You can upload a maximum of 2 files.';
        } else {
          this.files = [...this.files, ...files];
        }
      } else {
        this.files = [...files];
      }
    }

    if (isRestricted && files.length > 0) {
      this.hasError = true;
      this.errorTitle = 'Invalid format';
      this.errorMessage =
        'One or more uploaded files do not match the required format. Please check the file formats and try again.';
      this.files = [];
    }

    if (files.length === 0) {
      this.hasError = true;
      this.errorTitle = 'No file selected';
      this.errorMessage = 'Please upload one or more files to continue.';
    }

    this.onChange(this.files);
    this.onTouch();
  }

  /** Closes the error message. */
  onClose(): void {
    this.hasError = false;
  }

  /**
   * Removes a file from the list of uploaded files.
   * @param {File} file - The file to remove.
   * @emits removeFileEvt - Emits an event with the updated list of files and the multiple flag.
   */
  removeFile(file: File): void {
    this.files = this.files.filter((f: File) => f !== file);
    this.removeFileEvt.emit({ files: this.files, multiple: this.allowMultiple });
  }
}
