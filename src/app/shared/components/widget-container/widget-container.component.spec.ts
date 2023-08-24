import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetContainerComponent } from './widget-container.component';
import { render } from '@testing-library/angular';

describe('WidgetContainerComponent', () => {
  it('should display the title', async () => {
    const renderResult = await render(WidgetContainerComponent, {
      declarations: [WidgetContainerComponent],
      imports: [],
      componentInputs: {
        title: 'Mi Título'
      }
    });
    const titleElement = renderResult.getByText(/mi título/i);
    expect(titleElement).toBeInTheDocument();
  });
});
