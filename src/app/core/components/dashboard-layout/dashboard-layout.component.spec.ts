import { ComponentFixture } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { RenderResult, render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { NavigationComponent } from '../navigation/navigation.component';
import { UserAreaComponent } from '../user-area/user-area.component';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from '@features/auth/state/auth.state';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;
  let renderResult: RenderResult<DashboardLayoutComponent>;

  beforeEach(async () => {
    renderResult = await render(DashboardLayoutComponent, {
      declarations: [DashboardLayoutComponent, NavigationComponent, UserAreaComponent],
      imports: [RouterModule, MatMenuModule, NgxsModule.forRoot([AuthState]), HttpClientModule]
    });
    component = renderResult.fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = renderResult.fixture;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navigation logo', async () => {
    const navigationLogo = screen.getAllByRole('img')[0];
    expect(navigationLogo).toBeTruthy();
  });

  it('should render the navigation logo with the correct alt text', async () => {
    const navigationLogo = screen.getAllByRole('img')[0] as HTMLImageElement;
    expect(navigationLogo.alt).toEqual('SimpleSOLV Admin');
  });

  it('should render navigation links with the correct href attributes', async () => {
    const links = screen.getAllByRole('link', { hidden: true });
    const orgLink = links[0];
    expect(orgLink.getAttribute('href')).toEqual('/organizations');

    /*     const userLink = links[1];
    expect(userLink.getAttribute('href')).toEqual('/users');
 */
    const settingsLink = links[1];
    expect(settingsLink.getAttribute('href')).toEqual('/settings');
  });
});
