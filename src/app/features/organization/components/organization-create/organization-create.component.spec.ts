import { render } from '@testing-library/angular';
import { OrganizationCreateComponent } from './organization-create.component';
import { BreadcrumbsComponent } from '@shared/components/breadcrumbs/breadcrumbs.component';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '@shared/directives/input/input.directive';
import { MatRadioModule } from '@angular/material/radio';

describe('OrganizationCreateComponent', () => {
  it('should render OrganizationCreateComponent', async () => {
    const { container } = await render(OrganizationCreateComponent, {
      declarations: [BreadcrumbsComponent, OrganizationFormComponent, InputDirective],
      imports: [ReactiveFormsModule, FormsModule, MatRadioModule]
    });

    expect(container).toBeTruthy();
  });
});
