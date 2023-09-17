import { CdkTableModule } from '@angular/cdk/table';
import { MatMenuModule } from '@angular/material/menu';
import { LoaderComponent } from '@core/components/loader/loader.component';
import { render } from '@testing-library/angular';
import { UserTableComponent } from './user-table.component';
import { BadgeComponent } from '@shared/components/badge/badge.component';

xdescribe('UserTableComponent', () => {
  it('should render UserTableComponent', async () => {
    const { container } = await render(UserTableComponent, {
      declarations: [LoaderComponent, BadgeComponent],
      imports: [CdkTableModule, MatMenuModule]
    });

    expect(container).toBeTruthy();
  });
});
