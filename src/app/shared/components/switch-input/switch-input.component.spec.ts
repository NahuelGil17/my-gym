import { render, RenderResult, fireEvent } from '@testing-library/angular';
import { FormsModule, NgControl } from '@angular/forms';
import { SwitchInputComponent } from './switch-input.component';

describe('SwitchInputComponent', () => {
  let component: RenderResult<SwitchInputComponent>;

  beforeEach(async () => {
    component = await render(SwitchInputComponent, {
      imports: [FormsModule],
      providers: [NgControl],
      componentProperties: {
        title: 'Mi título',
        caption: 'Mi descripción'
      }
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default value', () => {
    const checkboxInput = component.getByRole('checkbox');
    expect(checkboxInput).not.toBeChecked();
  });

  it('should display the checkbox', () => {
    const titleElement = component.getByRole('checkbox', { name: /mi título mi descripción/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('should handle input changes', () => {
    const checkboxInput = component.getByRole('checkbox');
    fireEvent.click(checkboxInput);
    expect(checkboxInput).toBeChecked();
  });
});
