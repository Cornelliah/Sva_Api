import { Component} from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { NavComponent } from "../../components/nav/nav.component";
import { LoginComponent } from '../../components/login/login.component';
import { LandingComponent } from '../../components/landing/landing.component';
import { MessageComponent } from '../../components/message/message.component';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { HttpClient } from '@angular/common/http';
import { NotfoundComponent } from '../../components/notfound/notfound.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, RouterLink, RouterLinkActive, LoginComponent,LandingComponent, MessageComponent, ConfirmationComponent,NotfoundComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent  {

  title = 'feedz';
  constructor(private http: HttpClient) {}
  
}

