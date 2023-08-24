import { Component, Input } from '@angular/core';

/**
 * The WidgetContainerComponent is a container component for widgets.
 */
@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.css']
})
export class WidgetContainerComponent {
  /**
   * The title of the widget container.
   */
  @Input() title!: string;
}
