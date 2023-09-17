import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routine, User, UserApiResponse } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number, searchQuery?: string): Observable<UserApiResponse[]> {
    let params = new HttpParams()
      .set('pagination[page]', page.toString())
      .set('pagination[pageSize]', pageSize.toString());
    if (searchQuery) {
      params = params
        .set('filters[$or][0][name][$contains]', searchQuery.toString())
        .set('filters[$or][1][lastName][$contains]', searchQuery.toString());
    }

    return this.http.get<UserApiResponse[]>(`${environment.api}/clients`, { params });
  }

  getUser(id: number): Observable<User> {
    const url = `${environment.api}/clients/${id}?populate=*`;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<User> {
    const url = `${environment.api}/clients/${user.id}`;
    return this.http.put<User>(url, { data: user });
  }

  createUser(user: User): Observable<User> {
    const url = `${environment.api}/clients`;
    return this.http.post<User>(url, user);
  }

  createRoutine(routine: Routine): Observable<Routine> {
    const url = `${environment.api}/routines`;
    return this.http.post<Routine>(url, { data: routine });
  }

  updateRoutine(routine: Routine): Observable<Routine[]> {
    const url = `${environment.api}/routines/${routine.id}`;
    return this.http.put<Routine[]>(url, { data: routine });
  }

  desactivateUser(id: string): Observable<User> {
    const url = `${environment.api}/clients/${id}`;
    const data = { data: { isActive: false } };
    return this.http.put<User>(url, data);
  }
}
