import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user';
  private apiUrl2 = 'http://localhost:3000/auth';

  private userIdSubject = new BehaviorSubject<number | null>(null); 

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserId(); 
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.userIdSubject.next(null); // Réinitialiser l'ID de l'utilisateur
    }
    return new Observable(observer => {
      observer.next({ message: 'Déconnexion réussie' });
      observer.complete();
    });
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  getUserId(): Observable<number | null> {
    return this.userIdSubject.asObservable();
  }

  private loadUserId(): void {

    const token = localStorage.getItem('token');

    if (token) {
      
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

      this.http.get<{ userId: number }>(`${this.apiUrl2}/me`,{headers}).subscribe(
        response => {
          this.userIdSubject.next(response.userId);
        },
        error => {
          console.error('Erreur lors de la récupération de l\'ID utilisateur', error);
          this.userIdSubject.next(null);
        }
      );
    } else {
      this.userIdSubject.next(null);
    }
  }
}
