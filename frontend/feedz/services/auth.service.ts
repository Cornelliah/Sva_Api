import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user'; 

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    // Appeler une API pour la déconnexion si nécessaire
    // return this.http.post<any>(`${this.apiUrl}/logout`, {});
    
    if (isPlatformBrowser(this.platformId)) {
      // Supprimer le token du localStorage uniquement si nous sommes côté client
      localStorage.removeItem('token');
    }
    return new Observable(observer => {
      observer.next({ message: 'Déconnexion réussie' });
      observer.complete();
    });
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Vérifier le token uniquement si nous sommes côté client
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }
}
