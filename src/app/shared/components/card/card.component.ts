import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {
  constructor() {
    this.day = '';
    this.endTime = '';
    this.startTime = '';
    this.exercises = [];
  }

  @Input() day: string;
  @Input() endTime: string;
  @Input() startTime: string;
  @Input() exercises: string[];
  exercisesParced!: {
    exerciseName: string;
    series: number;
    reps: number;
  }[];

  @Output() readonly deleteRoutineEvent = new EventEmitter<void>();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exercises']) {
      this.exercisesParced = this.parseExercises(changes['exercises'].currentValue);
    }
  }
  deleteRoutine(): void {
    this.deleteRoutineEvent.emit();
  }

  parseExercises(input: string): Array<{ exerciseName: string; series: number; reps: number }> {
    const exerciseList = input.split('.').filter((e) => e.trim() !== '');

    return exerciseList.map((exerciseString) => {
      const seriesMatch = exerciseString.match(/(\d+) series/);
      const repsMatch = exerciseString.match(/(\d+) repeticiones/);

      const series = seriesMatch ? parseInt(seriesMatch[1], 10) : 0;
      const reps = repsMatch ? parseInt(repsMatch[1], 10) : 0;

      const exerciseName = exerciseString.split(':')[0].trim();

      return {
        exerciseName,
        series,
        reps
      };
    });
  }
}
