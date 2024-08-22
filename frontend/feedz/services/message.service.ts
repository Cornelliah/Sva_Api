import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = 'http://localhost:3000/messages/send'; 
  private authHeaderUrl = 'http://localhost:3000/header/auth';

  constructor(private http: HttpClient) { }

  sendMessage(expediteur: string, destinataire: string, contenu: string): Observable<any> {

    return this.http.get<{ authorization_header: string }>(this.authHeaderUrl).pipe(
      switchMap(authHeader => {
        const dataObject = {
          authorization_header: authHeader.authorization_header, 
          area_code: '+221', 
          receiver_number: destinataire,
          sender_phone: expediteur,
          sms_body: contenu
        };
         
        return this.http.post<any>(this.apiUrl, dataObject);
      })
    );
  }
}
