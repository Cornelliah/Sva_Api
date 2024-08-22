import { Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { LandingComponent } from '../../components/landing/landing.component';
import { MessageComponent } from '../../components/message/message.component';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { NotfoundComponent } from '../../components/notfound/notfound.component';
import { RegisterComponent } from '../../components/register/register.component';
import { MarketingComponent } from '../../components/marketing/marketing.component';
import { CampaignComponent } from '../../components/campaign/campaign.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'campagnes', component: CampaignComponent },
  { path: '', component: LandingComponent },
  { path: 'messages', component: MessageComponent },
  { path: 'market', component: MarketingComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**',  component: NotfoundComponent } 
];
