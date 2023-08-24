import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { render } from '@testing-library/angular';
import { CheckEmailComponent } from '../check-email/check-email.component';
import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  it('should render ForgotPasswordComponent', async () => {
    const { container } = await render(ForgotPasswordComponent, {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
      declarations: [CheckEmailComponent]
    });

    expect(container).toBeTruthy();
  });
});
