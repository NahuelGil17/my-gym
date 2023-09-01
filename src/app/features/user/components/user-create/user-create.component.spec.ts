import { render } from '@testing-library/angular';
import { UserCreateComponent } from './user-create.component';
import { BreadcrumbsComponent } from '@shared/components/breadcrumbs/breadcrumbs.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '@shared/directives/input/input.directive';
import { MatRadioModule } from '@angular/material/radio';

describe('OrganizationCreateComponent', () => {
  it('should render OrganizationCreateComponent', async () => {
    const { container } = await render(UserCreateComponent, {
      declarations: [BreadcrumbsComponent, UserCreateComponent, InputDirective, UserFormComponent],
      imports: [ReactiveFormsModule, FormsModule, MatRadioModule]
    });

    expect(container).toBeTruthy();
  });
});
