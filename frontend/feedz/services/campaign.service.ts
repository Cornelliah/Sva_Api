import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Campaign } from '../models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private apiUrl = 'http://localhost:3000/marketing/campagnes'; 

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addCampaign(campaign: Campaign): Observable<Campaign> {
   

    return this.http.post<Campaign>(this.apiUrl, campaign);
  }


  //Liste des campagnes
  getCampaigns(): Observable<Campaign[]> {
    return new Observable<Campaign[]>(observer => {
      
      this.authService.getUserId().subscribe(userId => {

        if (userId !== null) {
         

          this.http.get<Campaign[]>(`${this.apiUrl}?user_id=${userId}`).subscribe(
            campaigns => {
              observer.next(campaigns);
              observer.complete();
            },
            error => {
              observer.error(error);
            }
          );
        } else {
          observer.next([]);
        }
      });
    });
  }
}
