import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pluralize text based on value and singular or plural texts provided.
 * If not pluralText provided will add an 's' character to the singularText
 * @param {value} number - Value to evaluate
 * @param {singularText} string - Word in singular to display
 * @param {pluralText} string - Word in plural to display
 * @returns {string}
 * @example
 * <!-- having numberOfCities = 2, singularText = 'city' , pluralText = 'cities', for example -->
 * <p>{{ numberOfCities | pluralize : 'city' : 'cities' }}</p>
 * will returns 'cities'
 *
 * <!-- having numberOfCities = 2, singularText = 'city', for example -->
 * <p>{{ numberOfCities | pluralize : 'city' }}</p>
 * will returns 'cities'
 */
@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {
  transform(value: number, singularText: string, pluralText?: string): string {
    const pluralWord = pluralText ? pluralText : `${singularText}s`;
    return value > 1 ? `${pluralWord}` : `${singularText}`;
  }
}
