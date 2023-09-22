import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from '@core/services/snackbar.service';
import { AddPanel } from '@features/panel/state/panel.actions';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-panel-modal',
  templateUrl: './add-panel-modal.component.html',
  styleUrls: ['./add-panel-modal.component.scss']
})
export class AddPanelModalComponent implements OnDestroy, OnInit {
  /*
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
    public dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private store: Store,
    private actions: Actions,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.panelForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      routine: [[], Validators.required]
    });
    this.actions.pipe(ofActionSuccessful(AddPanel), takeUntil(this.destroy)).subscribe(() => {
      this.snackBar.showSuccess('Exito', 'Panel agregado correctamente');
      this.handleCancel();
    });
  }

  addPanel(): void {
    this.store.dispatch(new AddPanel(this.panelForm.value));
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
