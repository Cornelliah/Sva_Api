import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:3000/statistics';

  constructor(private http: HttpClient) {}

  getSendingStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sending`);
  }

  updateStatistics(stats: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update`, stats);
  }

  getLatestStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/latest`);
  }
}
