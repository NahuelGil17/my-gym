import { HttpErrorResponse } from '@angular/common/http';

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

export interface UsersStateModel {
  users: User[];
  loading: boolean;
  error: HttpErrorResponse | null;
}
