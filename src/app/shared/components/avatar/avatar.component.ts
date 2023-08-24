import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * The AvatarComponent displays an avatar image with an optional notification status.
 */
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnChanges {
  /**
   * The size of the avatar element.
   */
  @Input()
  sizeAvatar!: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

  /**
   * The source URL of the avatar image.
   */
  @Input()
  src!: string;

  /**
   * The alternative text for the avatar image.
   */
  @Input()
  alt = 'avatar';

  /**
   * The notification status of the avatar element.
   */
  @Input()
  notification: 'active' | 'disabled' | 'off' = 'off';

  /**
   * The class for the avatar.
   */
  classAvatar!: string;
  /**
   * The notification status for the avatar.
   */
  notificationStatus!: string;
  /**
   * The size of the notification for the avatar.
   */
  notificationSize!: string;
  /**
   * The classes for the notification for the avatar.
   */
  notificationClasses!: string;

  /**
   * Creates an instance of AvatarComponent.
   */
  constructor() {
    this.classAvatar = `h-7 w-7 rounded-full`;
    this.notificationStatus = '';
    this.notificationClasses = '';
    this.notificationSize = ' h-3 w-3 ';
  }

  /**
   * Called when any of the input properties change.
   * @param {SimpleChanges} changes - The changes object.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sizeAvatar']) {
      this.setSize(changes['sizeAvatar'].currentValue);
    }
    if (changes['notification']) {
      this.getClassNotification(changes['notification'].currentValue);
    }
    if (this.notification !== 'off') {
      this.notificationClasses = this.notificationSize + this.notificationStatus;
    } else {
      this.notificationClasses = ' ';
    }
  }

  /**
   * Sets the class for the avatar element based on the specified size.
   * @param {string} size The size of the avatar element.
   */
  setSize(size: string): void {
    switch (size) {
      case 'xs':
        this.classAvatar = 'h-5 w-5 rounded-full';
        this.notificationSize = ' h-0.6 w-0.6 ';

        break;
      case 'sm':
        this.classAvatar = 'h-6 w-6 rounded-full';
        this.notificationSize = ' h-0.8 w-0.8 ';

        break;
      case 'md':
        this.classAvatar = 'h-7 w-7 rounded-full';
        this.notificationSize = ' h-3 w-3 ';

        break;
      case 'lg':
        this.classAvatar = 'h-9 w-9 rounded-full';
        this.notificationSize = ' h-3 w-3 ';

        break;
      case 'xl':
        this.classAvatar = 'h-9.5 w-9.5 rounded-full';
        this.notificationSize = ' h-4 w-4 ';

        break;
      default:
        this.classAvatar = 'h-10 w-10 rounded-full';
        this.notificationSize = ' h-4 w-4 ';

        break;
    }
  }

  /**
   * Sets the class for the notification status element based on the specified notification status.
   * @param {string} notification The notification status of the avatar element.
   */
  getClassNotification(notification: string): void {
    if (this.notification !== 'off') {
      this.notificationStatus = 'absolute bottom-0 right-0 block rounded-full ring-2 ring-white';
    }
    switch (notification) {
      case 'active':
        this.notificationStatus += ` bg-green-400 `;
        break;
      case 'disabled':
        this.notificationStatus += ` bg-red-400 `;
        break;
    }
  }
}
