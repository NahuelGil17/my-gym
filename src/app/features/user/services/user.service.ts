import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserApiResponse } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number): Observable<UserApiResponse[]> {
    const params = new HttpParams()
      .set('pagination[page]', page.toString())
      .set('pagination[pageSize]', pageSize.toString());

    return this.http.get<UserApiResponse[]>(`${environment.api}/clients`, { params });
  }

  getUser(id: number): Observable<User> {
    const url = `${environment.api}/clients/${id}`;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<User> {
    const url = `${environment.api}/clients/${user.id}`;
    return this.http.put<User>(url, user);
  }
}
