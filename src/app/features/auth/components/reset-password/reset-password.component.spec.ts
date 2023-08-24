import { render } from '@testing-library/angular';
import { ResetPasswordComponent } from './reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ResetPasswordComponent', () => {
  it('should render login  component', async () => {
    const { container } = await render(ResetPasswordComponent, { imports: [ReactiveFormsModule] });

    expect(container).toBeTruthy();
  });
});
