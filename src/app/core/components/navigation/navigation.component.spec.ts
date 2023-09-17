import { NavigationComponent } from './navigation.component';
import { render, screen } from '@testing-library/angular';

xdescribe('NavigationComponent', () => {
  it('should render navigation component', async () => {
    const { container } = await render(NavigationComponent);

    expect(container).toBeTruthy();

    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    /*  expect(screen.getByText('Users')).toBeInTheDocument(); */
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
