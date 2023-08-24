import { Component, Input } from '@angular/core';

/**
 * The PageHeaderComponent displays a header with a title and a caption.
 */
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
  /**
   * The title of the header.
   */
  @Input() title!: string;

  /**
   * The caption of the header.
   */
  @Input() caption!: string;
}
