import { render } from '@testing-library/angular';
import { UserLayoutComponent } from './user-layout.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';

describe('OrganizationLayoutComponent', () => {
  it('should render OrganizationLayoutComponent', async () => {
    const { container } = await render(UserLayoutComponent, {
      declarations: [PageHeaderComponent],
      imports: [RouterModule]
    });

    expect(container).toBeTruthy();
  });
});
