import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EColorBadge } from '../../enums/badge-color.enums';

/**
 * The TableComponent displays a table of data.
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent {
  EColorBadge: typeof EColorBadge = EColorBadge;

  /**
   * The list of column names to display in the table.
   * @type {Array} array of column names
   */
  @Input() displayedColumns: string[] = [];

  /**
   * The data to display in the table.
   * @type {Observable} observable of data
   */
  @Input() data!: Observable<any[]>;

  /**
   * The total number of items in the data set.
   * @type {number} total count
   */
  @Input() total: number | null = 0;

  /**
   * Whether the data is currently being loaded.
   * @type {boolean} loading state
   */
  @Input() loading: boolean | null = false;

  /**
   * Whether the data has been filtered.
   * @type {boolean} filtered state
   */
  @Input() filteredData = false;

  /**
   * Header css class
   * @type {string} css class
   */
  @Input() headerCssClass = 'header-default';
}
