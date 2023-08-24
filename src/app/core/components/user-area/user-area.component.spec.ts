import { MatMenuModule } from '@angular/material/menu';
import { UserAreaComponent } from './user-area.component';
import { render } from '@testing-library/angular';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from '@features/auth/state/auth.state';
import { HttpClientModule } from '@angular/common/http';

describe('UserAreaComponent', () => {
  it('should render user area component', async () => {
    const { container } = await render(UserAreaComponent, {
      imports: [MatMenuModule, NgxsModule.forRoot([AuthState]), HttpClientModule]
    });

    expect(container).toBeTruthy();
  });
});
