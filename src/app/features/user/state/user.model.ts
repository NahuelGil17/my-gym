import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../interfaces/user.interface';

export class UserStateModel {
  users?: User[] | null;
  loading?: boolean | null;
  total?: number | null;
  error?: HttpErrorResponse | null;
  currentPage?: number | null;
  pageSize?: number | null;
  pageCount?: number | null;
}
