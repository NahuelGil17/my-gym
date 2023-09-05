import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../interfaces/user.interface';

export class UserStateModel {
  users?: User[];
  loading?: boolean;
  error?: HttpErrorResponse | null;
}
