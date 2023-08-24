import { render, screen } from '@testing-library/angular';
import { CheckEmailComponent } from './check-email.component';

describe('CheckEmailComponent', () => {
  it('should render CheckEmailComponent', async () => {
    const { container } = await render(CheckEmailComponent, {
      componentInputs: {
        email: 'asd@asd.com'
      }
    });

    expect(container).toBeTruthy();

    const title = screen.getByText('Check Email');
    expect(title).toBeInTheDocument();

    const emailText = screen.getByText('We sent a password link to asd@asd.com');
    expect(emailText).toBeInTheDocument();
  });
});
