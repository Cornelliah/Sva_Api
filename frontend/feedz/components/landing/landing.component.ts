import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavComponent, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Déconnexion échouée', error);
      }
    });
  }
}
