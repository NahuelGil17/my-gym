import { screen, render, waitFor } from '@testing-library/angular';
import '@testing-library/angular';
import { BadgeComponent } from './badge.component';
import '@testing-library/jest-dom';
import { EColorBadge } from '../../enums/badge-color.enums';
import { Eshape } from '../../enums/shape.enums';
import { Eicon } from '../../enums/icon.enums';

describe(BadgeComponent, () => {
  it('should render component whit default props', async () => {
    await render(BadgeComponent);
    const badgeProgress = screen.getByTestId('badge');

    expect(screen.getByRole('i')).toBeTruthy();
    expect(Array.from(badgeProgress.classList).sort()).toEqual([
      'bg-primary-100',
      'body-xs',
      'font-semibold',
      'inline-flex',
      'items-center',
      'px-2',
      'py-1',
      'text-primary-500'
    ]);
  });
  it('should render update color', async () => {
    const { rerender } = await render(BadgeComponent, {
      componentProperties: { colorBadge: EColorBadge.PRIMARY, textBadge: 'Badge' }
    });

    let badgeProgress = screen.getByText(/badge/i);
    expect(Array.from(badgeProgress.classList).sort()).toEqual([
      'bg-primary-100',
      'body-xs',
      'font-semibold',
      'inline-flex',
      'items-center',
      'px-2',
      'py-1',
      'rounded-lg',
      'text-primary-500'
    ]);
    await rerender({
      componentInputs: { colorBadge: EColorBadge.SUCCESS }
    });
    badgeProgress = screen.getByTestId('badge');
    expect(badgeProgress).toBeInTheDocument();
    await rerender({
      componentInputs: { colorBadge: EColorBadge.WARNING }
    });

    badgeProgress = screen.getByTestId('badge');
    expect(Array.from(badgeProgress.classList).sort()).toEqual([
      'bg-warning-50',
      'body-xs',
      'font-semibold',
      'inline-flex',
      'items-center',
      'px-2',
      'py-1',
      'rounded-lg',
      'text-warning-200'
    ]);

    await rerender({
      componentInputs: { colorBadge: EColorBadge.ERROR }
    });

    badgeProgress = screen.getByTestId('badge');
    expect(Array.from(badgeProgress.classList).sort()).toEqual([
      'bg-error-50',
      'body-xs',
      'font-semibold',
      'inline-flex',
      'items-center',
      'px-2',
      'py-1',
      'rounded-lg',
      'text-error-200'
    ]);
    await rerender({
      componentInputs: { colorBadge: EColorBadge.INFO }
    });
    badgeProgress = screen.getByTestId('badge');
    expect(Array.from(badgeProgress.classList).sort()).toEqual([
      'bg-info-50',
      'body-xs',
      'font-semibold',
      'inline-flex',
      'items-center',
      'px-2',
      'py-1',
      'rounded-lg',
      'text-info-200'
    ]);
    await rerender({
      componentInputs: { colorBadge: EColorBadge.NEUTRAL }
    });
    badgeProgress = screen.getByTestId('badge');
    expect(Array.from(badgeProgress.classList).sort()).toEqual([
      'bg-neutral-300',
      'body-xs',
      'font-semibold',
      'inline-flex',
      'items-center',
      'px-2',
      'py-1',
      'rounded-lg',
      'text-neutral-1000'
    ]);
  });
  it('should render update shape badge', async () => {
    const { rerender } = await render(BadgeComponent, {
      componentProperties: { shapeBadge: Eshape.ROUNDED }
    });
    let badgeProgress = screen.getByTestId('badge');

    expect(Array.from(badgeProgress.classList).sort()).toEqual([
      'bg-primary-100',
      'body-xs',
      'font-semibold',
      'inline-flex',
      'items-center',
      'px-2',
      'py-1',
      'rounded-lg',
      'text-primary-500'
    ]);

    await rerender({
      componentInputs: { shapeBadge: Eshape.SQUARE }
    });
    badgeProgress = screen.getByTestId('badge');
    expect(Array.from(badgeProgress.classList).sort()).toEqual([
      'bg-primary-100',
      'body-xs',
      'font-semibold',
      'inline-flex',
      'items-center',
      'px-2',
      'py-1',
      'rounded-lg',
      'rounded-sm',
      'text-primary-500'
    ]);
  });
  it('should render update icon', async () => {
    const { rerender } = await render(BadgeComponent, {
      componentProperties: { icon: Eicon.ARROW }
    });

    let iconProgress = screen.getByRole('i');
    expect(Array.from(iconProgress.classList).sort()).toEqual(['mr-1', 'ph-arrow-up']);
    await rerender({
      componentProperties: { icon: Eicon.DOT }
    });

    iconProgress = screen.getByRole('i');
    expect(Array.from(iconProgress.classList).sort()).toEqual(['mr-1', 'ph-circle-fill', 'text-sm']);
    await rerender({
      componentInputs: { icon: Eicon.OFF }
    });
    iconProgress = screen.getByRole('i');
    expect(Array.from(iconProgress.classList).sort()).toEqual([]);
  });

  it('should render update textbadge ', async () => {
    await render(BadgeComponent, {
      componentProperties: { textBadge: 'this is a test' }
    });
    expect(screen.getByText('this is a test')).toBeInTheDocument();
  });
});
