import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PanelPayload } from '../interfaces/panel.interface';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  constructor(private http: HttpClient) {}

  getPanels(data: PanelPayload): Observable<any> {
    return this.http.get<any>(
      `${environment.api}/clients?populate=*&filters[isActive][$eq]=true&filters[routines][day][$eq]=Lunes&filters[routines][startTime][$eq]=19:00:00.000&filters[routines][endTime][$eq]=20:00:00.000`
    );
  }
}

//  `${environment.api}/clients?populate=*&filters[routines][day][$eq]=${data.day}&filters[routines][startTime][$eq]=${data.startTime}&filters[routines][endTime][$eq]=${data.endTime}`
