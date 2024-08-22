import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/campaign.model';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-campaign',
  standalone:true,
  imports:[NavComponent,CommonModule],
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  campaigns: Campaign[] = [];
 
  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.campaignService.getCampaigns().subscribe(data => {
      this.campaigns = data;
    });
  }

  
}
