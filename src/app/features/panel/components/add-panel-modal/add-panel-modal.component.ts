import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from '@core/services/snackbar.service';
import { Actions, Store } from '@ngxs/store';
import { UploadedDocumentObject } from '@shared/interfaces/upload-dialog.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-panel-modal',
  templateUrl: './add-panel-modal.component.html',
  styleUrls: ['./add-panel-modal.component.scss']
})
export class AddPanelModalComponent implements OnInit, OnDestroy {
  /**
   * The form group for the panel form.
   */
  panelForm!: FormGroup;

  /**
   * Used to unsubscribe observable actions
   *
   */
  destroy = new Subject<void>();

  /**
   * Creates an instance of UploadDocumentModalComponent.
   * @param dialogRef The dialog reference.
   * @param data The data passed to the dialog.
   * @param fb The form builder service.
   * @param store The NgRx store.
   * @param actions The NgRx actions service.
   * @param snackBar The snackbar service.
   */
  constructor(
    public dialogRef: DialogRef<UploadedDocumentObject>,
    @Inject(DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private store: Store,
    private actions: Actions,
    private snackBar: SnackBarService
  ) {
    this.panelForm = this.fb.group({
      accountingMethod: [null, [Validators.required]]
    });
  }

  /**
   * Upon component inialization subscribe to form value changes and emit form values when form is valid
   */
  ngOnInit(): void {
    this.panelForm.valueChanges.subscribe((value) => {
      if (this.panelForm.valid) {
        this.dialogRef.close(value);
      }
    });
  }

  /**
   * Closes the dialog when the cancel button is clicked.
   */
  handleCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Complete observable when component is destroyed to avoid memory leaks
   */
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
