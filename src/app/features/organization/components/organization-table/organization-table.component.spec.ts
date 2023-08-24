import { CdkTableModule } from '@angular/cdk/table';
import { MatMenuModule } from '@angular/material/menu';
import { LoaderComponent } from '@core/components/loader/loader.component';
import { render } from '@testing-library/angular';
import { OrganizationTableComponent } from './organization-table.component';
import { BadgeComponent } from '@shared/components/badge/badge.component';

describe('OrganizationTableComponent', () => {
  it('should render OrganizationTableComponent', async () => {
    const { container } = await render(OrganizationTableComponent, {
      declarations: [LoaderComponent, BadgeComponent],
      imports: [CdkTableModule, MatMenuModule]
    });

    expect(container).toBeTruthy();
  });
});
