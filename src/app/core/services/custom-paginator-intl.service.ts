import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

/**
 * The CustomPaginatorIntlService provides custom labels and range label for the MatPaginator.
 */
@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorIntlService implements MatPaginatorIntl {
  /**
   * A subject for managing changes.
   */
  changes = new Subject<void>();

  /**
   * The label for the first page button.
   */
  firstPageLabel = `First page`;

  /**
   * The label for the items per page select.
   */
  itemsPerPageLabel = `Items per page:`;

  /**
   * The label for the last page button.
   */
  lastPageLabel = `Last page`;

  /**
   * The label for the next page button.
   */
  nextPageLabel = 'Next page';

  /**
   * The label for the previous page button.
   */
  previousPageLabel = 'Previous page';

  /**
   * Returns the range label for the paginator.
   * @param {number} page The current page number.
   * @param {number} pageSize The number of items per page.
   * @param {number} length The total number of items.
   * @returns The range label string.
   */
  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length == 0 || pageSize == 0) {
      return `Showing 0 of ${length} results`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `Showing ${startIndex + 1} to ${endIndex} of ${length} results`;
  }
}
