import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should create the app', async () => {
    const { container } = await render(AppComponent);
    expect(container).toBeTruthy();
  });

  /*   it(`should have as title 'angular-jest'`, async () => {
    await render(AppComponent);
    const el = screen.getByText(/angular-jest/i);
    expect(el).toBeInTheDocument();
  }); */
});
