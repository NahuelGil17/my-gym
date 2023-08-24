import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { ESeverity, SeverityIcon } from '@shared/enums/severity.enum';
import { render, screen } from '@testing-library/angular';
import { SnackBarComponent } from './snackbar.component';

describe('SnackBarComponent', () => {
  it('should create', async () => {
    const { container } = await render(SnackBarComponent, {
      imports: [MatSnackBarModule],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
        { provide: MatSnackBarRef, useValue: {} }
      ]
    });
    expect(container).toBeTruthy();
  });

  it('should display texts', async () => {
    await render(SnackBarComponent, {
      imports: [MatSnackBarModule],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
        { provide: MatSnackBarRef, useValue: {} }
      ],
      componentProperties: {
        data: {
          title: 'Error title',
          message: 'Error Message',
          severity: ESeverity.ERROR
        }
      }
    });

    const textValues = screen.getAllByText(/error/i);

    expect(textValues.length).toBe(2);
  });

  it('should change icon based on severity', async () => {
    const data = {
      title: 'Title',
      message: 'Message',
      severity: ESeverity.ERROR
    };
    const { rerender, container } = await render(SnackBarComponent, {
      imports: [MatSnackBarModule],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
        { provide: MatSnackBarRef, useValue: {} }
      ],
      componentProperties: {
        icon: SeverityIcon[data.severity],
        data
      }
    });
    expect(container.getElementsByClassName('ph-x-circle-fill').length).toBe(1);

    await rerender({
      componentProperties: { icon: SeverityIcon.info, data: { ...data, severity: ESeverity.INFO } }
    });
    expect(container.getElementsByClassName('ph-info-fill').length).toBe(1);

    await rerender({
      componentProperties: { icon: SeverityIcon.success, data: { ...data, severity: ESeverity.SUCCESS } }
    });
    expect(container.getElementsByClassName('ph-check-circle-fill').length).toBe(1);

    await rerender({
      componentProperties: { icon: SeverityIcon.warning, data: { ...data, severity: ESeverity.WARNING } }
    });
    expect(container.getElementsByClassName('ph-warning-fill').length).toBe(1);
  });
});
