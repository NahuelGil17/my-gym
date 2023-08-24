import { NavigationComponent } from './navigation.component';
import { render, screen } from '@testing-library/angular';

describe('NavigationComponent', () => {
  it('should render navigation component', async () => {
    const { container } = await render(NavigationComponent);

    expect(container).toBeTruthy();

    expect(screen.getByText('Organizations')).toBeInTheDocument();
    /*  expect(screen.getByText('Users')).toBeInTheDocument(); */
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
