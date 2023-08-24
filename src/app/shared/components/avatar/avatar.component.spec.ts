import { fireEvent, render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  it('should render component whit default props', async () => {
    await render(AvatarComponent);
    const avatarProgress = screen.getByAltText('avatar');

    expect(screen.getByTestId('container')).toBeTruthy();
    expect(screen.getByRole('notification')).toBeTruthy();
    expect(Array.from(avatarProgress.classList).sort()).toEqual(['h-7', 'rounded-full', 'w-7']);
  });

  it('should update avatar size', async () => {
    const { rerender } = await render(AvatarComponent, {
      componentProperties: { sizeAvatar: 'xs' }
    });
    let avatarProgress = screen.getByAltText('avatar');

    expect(Array.from(avatarProgress.classList).sort()).toEqual(['h-5', 'rounded-full', 'w-5']);
    await rerender({
      componentInputs: { sizeAvatar: 'sm' }
    });
    avatarProgress = screen.getByAltText('avatar');

    expect(Array.from(avatarProgress.classList).sort()).toEqual(['h-10', 'rounded-full', 'w-10']);
    await rerender({
      componentInputs: { sizeAvatar: 'md' }
    });
    avatarProgress = screen.getByAltText('avatar');

    expect(Array.from(avatarProgress.classList).sort()).toEqual(['h-7', 'rounded-full', 'w-7']);
    await rerender({
      componentInputs: { sizeAvatar: 'lg' }
    });
    avatarProgress = screen.getByAltText('avatar');
    expect(Array.from(avatarProgress.classList).sort()).toEqual(['h-9', 'rounded-full', 'w-9']);
    await rerender({
      componentInputs: { sizeAvatar: 'xl' }
    });
    avatarProgress = screen.getByAltText('avatar');
    expect(Array.from(avatarProgress.classList).sort()).toEqual(['h-9.5', 'rounded-full', 'w-9.5']);
    await rerender({
      componentInputs: { sizeAvatar: 'xxl' }
    });
    avatarProgress = screen.getByAltText('avatar');
    expect(Array.from(avatarProgress.classList).sort()).toEqual(['h-10', 'rounded-full', 'w-10']);
  });

  it('should update notification', async () => {
    const { rerender } = await render(AvatarComponent);
    let notification = screen.getByRole('notification');
    await rerender({
      componentInputs: { notification: 'active' }
    });
    notification = screen.getByRole('notification');

    expect(Array.from(notification.classList).sort()).toEqual([
      'absolute',
      'bg-green-400',
      'block',
      'bottom-0',
      'h-3',
      'right-0',
      'ring-2',
      'ring-white',
      'rounded-full',
      'w-3'
    ]);

    await rerender({
      componentInputs: { notification: 'disabled' }
    });
    notification = screen.getByRole('notification');
    expect(Array.from(notification.classList).sort()).toEqual([
      'absolute',
      'bg-red-400',
      'block',
      'bottom-0',
      'h-3',
      'right-0',
      'ring-2',
      'ring-white',
      'rounded-full',
      'w-3'
    ]);
  });
  it('should render default src when no input is provided', async () => {
    await render(AvatarComponent);
    const img: HTMLImageElement = screen.getByAltText('avatar');
    fireEvent.load(img);
  });
  it('should render src when input img', async () => {
    await render(AvatarComponent, {
      componentInputs: {
        src: 'https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg?w=2000'
      }
    });
    const src: HTMLImageElement = screen.getByAltText('avatar');
    expect(src.src).toEqual(
      'https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg?w=2000'
    );
  });
});
