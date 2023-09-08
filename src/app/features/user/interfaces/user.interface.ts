export interface User {
  id: string;
  name: string;
  lastName: string;
  Routines: Routine[];
}

export interface Routine {
  startTime: string; //Review this type
  endTime: string; //Review this type
  exercises: string;
  day: string;
}
