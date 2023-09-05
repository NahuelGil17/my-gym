import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api}/clients`);
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
