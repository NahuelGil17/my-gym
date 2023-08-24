import { Pipe, PipeTransform } from '@angular/core';

/**
 * Display one text or another based on value.
 * @param {value} boolean - Value to evaluate
 * @param {args} string - Texts to be displayed
 * @returns {string}
 * @example
 * <!-- having value = true, for example -->
 * <p>{{ value | conditionalText : 'This is true' : 'This is false' }}</p>
 * will returns 'This is true'
 */
@Pipe({
  name: 'conditionalText'
})
export class ConditionalTextPipe implements PipeTransform {
  transform(value: boolean | null, ...args: string[]): string {
    return value ? args[0] : args[1];
  }
}
