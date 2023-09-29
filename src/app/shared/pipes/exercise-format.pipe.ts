import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exerciseFormat'
})
export class ExerciseFormatPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/(\d+)/g, '<strong>$1</strong>');
  }
}
