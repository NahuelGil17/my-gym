import { BaseLayoutComponent } from './base-layout.component';
import { render } from '@testing-library/angular';

describe('BaseLayoutComponent', () => {
  it('should render layout component', async () => {
    const { container } = await render(BaseLayoutComponent);

    expect(container).toBeTruthy();
  });
});
