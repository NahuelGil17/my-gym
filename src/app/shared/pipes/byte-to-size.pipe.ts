import { Pipe, PipeTransform } from '@angular/core';
/**
 * Pipe for converting bytes to a human-readable size.
 * @implements PipeTransform
 * @example {{ 1024 | byteToSize }} will return 1 KB
 */
@Pipe({
  name: 'byteToSize'
})
export class ByteToSizePipe implements PipeTransform {
  /**
   * Transforms a byte value to a human-readable size.
   * @param {number} size - The byte value to transform.
   * @returns {string} The human-readable size.
   */
  transform(size: number): string {
    if (size) {
      const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
      let i = 0;
      while (size > 900) {
        size /= 1024;
        i++;
      }
      const exactSize = Math.round(size * 100) / 100 + ' ' + fSExt[i];
      return exactSize;
    }

    return '0';
  }
}
