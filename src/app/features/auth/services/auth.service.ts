import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthCredentials, AuthResponse, UserPreferences } from '../interfaces/auth';
import { UtilsService } from '@core/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private utilsService: UtilsService) {}

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.api}/auth/local`, credentials);
  }

  getUserPreferences(userId: string): Observable<UserPreferences> {
    return this.http.get<UserPreferences>(`${environment.api}/user/${userId}`);
  }

  requestReset(): void {
    // TODO
  }

  resetPassword(): void {
    // TODO
  }
}
