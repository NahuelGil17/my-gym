import { Pipe, PipeTransform } from '@angular/core';

/**
 * Display value or hyphen character.
 * @param {value} number - Value to evaluate
 * @returns {string | number}
 * @example
 * <!-- having value = null, for example -->
 * <p>{{ value | noData }}</p>
 * will returns hyphen character '-'
 */
@Pipe({
  name: 'noData'
})
export class NoDataPipe implements PipeTransform {
  transform(value: number | string | null): number | string {
    return value?.toString() ? value : '-';
  }
}
