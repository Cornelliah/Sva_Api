import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = 'http://localhost:3000/marketing/campagnes'; 

  constructor(private http: HttpClient) {}

  addCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(this.apiUrl, campaign);
  }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl);
  }
}
