import { render } from '@testing-library/angular';
import { OrganizationLayoutComponent } from './user-layout.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';

describe('OrganizationLayoutComponent', () => {
  it('should render OrganizationLayoutComponent', async () => {
    const { container } = await render(OrganizationLayoutComponent, {
      declarations: [PageHeaderComponent],
      imports: [RouterModule]
    });

    expect(container).toBeTruthy();
  });
});
