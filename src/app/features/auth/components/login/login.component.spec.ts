import { ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RenderResult, fireEvent, render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { InputDirective } from '../../../../shared/directives/input/input.directive';
import { LoginComponent } from './login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from '@features/auth/state/auth.state';
import { HttpClientModule } from '@angular/common/http';
import { ConditionalTextPipe } from '@shared/pipes/conditional-text.pipe';
import { BtnDirective } from '@shared/directives/btn/btn.directive';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let renderResult: RenderResult<LoginComponent>;

  beforeEach(async () => {
    renderResult = await render(LoginComponent, {
      declarations: [InputDirective, ConditionalTextPipe, BtnDirective],
      imports: [ReactiveFormsModule, MatSnackBarModule, NgxsModule.forRoot([AuthState]), HttpClientModule]
    });
    component = renderResult.fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = renderResult.fixture;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show password when toggle button is clicked', async () => {
    const user = userEvent.setup();
    const passwordInput = screen.getByPlaceholderText('Enter your credentials');
    expect(passwordInput).toBeInTheDocument();
    user.type(passwordInput, 'password');
    const toggleButton = screen.getAllByRole('button')[0];
    expect(toggleButton).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
    await user.click(toggleButton);
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute('type', 'text');
    });
  });

  it('should show error message when email is invalid', async () => {
    const user = userEvent.setup();

    const emailInput = screen.getAllByRole('textbox')[0];
    expect(emailInput).toBeInTheDocument();

    await user.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);

    const errorMessage = screen.getByText(/invalid email/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('validates password according to rules', async () => {
    const passwordInput = screen.getByPlaceholderText('Enter your credentials');

    await userEvent.clear(passwordInput);
    fireEvent.blur(passwordInput);
    await waitFor(() => expect(screen.getByText('This field is required')).toBeInTheDocument());

    await userEvent.type(passwordInput, 'abc1A');
    fireEvent.blur(passwordInput);
    await waitFor(() => expect(screen.getByText('Password must be at least 6 characters long')).toBeInTheDocument());

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'abcdefA');
    fireEvent.blur(passwordInput);
    await waitFor(() => expect(screen.getByText('The password must have a number')).toBeInTheDocument());

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'ABCDEF1');
    fireEvent.blur(passwordInput);
    await waitFor(() => expect(screen.getByText('The password must have lowercase characters')).toBeInTheDocument());

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'abcdef1');
    fireEvent.blur(passwordInput);
    await waitFor(() => expect(screen.getByText('The password must have uppercase characters')).toBeInTheDocument());

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Abcdef1');
    fireEvent.blur(passwordInput);
    await waitFor(() => expect(screen.getByText('The password must have special characters')).toBeInTheDocument());

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'Abcdef1!');
    fireEvent.blur(passwordInput);
    await waitFor(() => expect(screen.queryByText(/Password must/i)).not.toBeInTheDocument());
  });

  it('disables login button when form is invalid', async () => {
    const emailInput = screen.getAllByRole('textbox')[0];
    const passwordInput = screen.getByPlaceholderText('Enter your credentials');
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(loginButton).toBeDisabled();

    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);
    await waitFor(() => expect(screen.getByText(/invalid email/i)).toBeInTheDocument());
    expect(loginButton).toBeDisabled();

    await userEvent.type(passwordInput, 'abc1A');
    fireEvent.blur(passwordInput);
    await waitFor(() => expect(screen.getByText(/password must be at least 6 characters long/i)).toBeInTheDocument());
    expect(loginButton).toBeDisabled();
  });

  it('enables login button when form is valid', async () => {
    const emailInput = screen.getAllByRole('textbox')[0];
    const passwordInput = screen.getByPlaceholderText('Enter your credentials');
    const loginButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'test@example.com');
    fireEvent.blur(emailInput);
    await waitFor(() => expect(emailInput).toBeValid());

    await userEvent.type(passwordInput, 'Abcdef1!');
    fireEvent.blur(passwordInput);
    await waitFor(() => expect(passwordInput).toBeValid());

    expect(loginButton).toBeEnabled();
  });
});
