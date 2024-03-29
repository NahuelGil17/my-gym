import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '@shared/directives/input/input.directive';
import { RenderResult, render, screen } from '@testing-library/angular';
import { FiltersBarComponent } from './filters-bar.component';

xdescribe('FiltersBarComponent', () => {
  let component: RenderResult<FiltersBarComponent>;

  beforeEach(async () => {
    component = await render(FiltersBarComponent, {
      declarations: [InputDirective],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [NgControl]
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a input', async () => {
    const searchField = screen.getByPlaceholderText('Search');
    expect(searchField).toBeInTheDocument();
  });
});
