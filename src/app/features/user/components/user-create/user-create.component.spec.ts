import { render } from '@testing-library/angular';
import { UserCreateComponent } from './user-create.component';
import { BreadcrumbsComponent } from '@shared/components/breadcrumbs/breadcrumbs.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '@shared/directives/input/input.directive';
import { MatRadioModule } from '@angular/material/radio';
import { UserCreateRutineFormComponent } from '../user-create-rutine-form/user-create-rutine-form.component';
import { CardComponent } from '@shared/components/card/card.component';

describe('OrganizationCreateComponent', () => {
  it('should render OrganizationCreateComponent', async () => {
    const { container } = await render(UserCreateComponent, {
      declarations: [BreadcrumbsComponent, UserCreateComponent, InputDirective, UserFormComponent, UserCreateRutineFormComponent, CardComponent],
      imports: [ReactiveFormsModule, FormsModule, MatRadioModule]
    });

    expect(container).toBeTruthy();
  });
});
