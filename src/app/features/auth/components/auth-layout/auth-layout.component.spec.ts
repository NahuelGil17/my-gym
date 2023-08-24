import { render } from '@testing-library/angular';
import { BaseLayoutComponent } from 'src/app/shared/components/base-layout/base-layout.component';
import { AuthLayoutComponent } from './auth-layout.component';

describe('AuthLayoutComponent', () => {
  it('should render AuthLayoutComponent', async () => {
    const { container } = await render(AuthLayoutComponent, {
      declarations: [BaseLayoutComponent]
    });

    expect(container).toBeTruthy();
  });
});
