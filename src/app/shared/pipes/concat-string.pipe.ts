import { Pipe, PipeTransform } from '@angular/core';

/**
 * Concat values based on args and separator.
 * @param {string} value- First value to concat
 * @param {string} separator - Separator to apply while concat Ex: comma, empty space
 * @param {Array} args - List of remaining values to concat after value
 * @returns {string}
 * @example
 * <!-- having firstName = John and lastName = Smith, for example -->
 * <p>{{ user.firstName | concatString : ' ' : user.lastName }}</p>
 * will returns John Smith
 */
@Pipe({
  name: 'concatString'
})
export class ConcatStringPipe implements PipeTransform {
  transform(value: string | number | null, separator: string, ...args: Array<string | number>): string {
    return `${value}${separator}${args.join(separator)}`;
  }
}
