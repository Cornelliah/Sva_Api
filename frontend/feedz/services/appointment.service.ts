import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/hosto/appointments'; 
  

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Liste des rendez-vous pour l'utilisateur connecté
  getAppointments(): Observable<any[]> {
    return new Observable<any[]>(observer => {
      
      this.authService.getUserId().subscribe(userId => {

        if (userId !== null) {

          // Récupérer les rendez-vous en fonction de l'ID utilisateur
          this.http.get<any[]>(`${this.apiUrl}?user_id=${userId}`).subscribe(
            appointments => {
              observer.next(appointments);
              observer.complete();
            },
            error => {
              observer.error(error);
            }
          );
        } else {
          observer.next([]);
          observer.complete();
        }
      });
    });
  }

  addAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointment);
  }

  updateAppointment(appointment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${appointment.id}`, appointment);
  }

  cancelAppointment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  
}
