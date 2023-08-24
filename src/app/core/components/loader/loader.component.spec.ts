import { render } from '@testing-library/angular';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  it('should render loader component', async () => {
    const { container } = await render(LoaderComponent, {});

    expect(container).toBeTruthy();
  });
});
