import { render, RenderResult } from '@testing-library/angular';
import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: RenderResult<PageHeaderComponent>;

  beforeEach(async () => {
    component = await render(PageHeaderComponent, {
      componentProperties: {
        title: 'Mi Título',
        caption: 'Mi Subtítulo'
      }
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const titleElement = component.getByRole('heading', { name: /Mi Título/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('should display the caption', () => {
    const captionElement = component.getByText(/mi subtítulo/i);
    expect(captionElement).toBeInTheDocument();
  });
});
