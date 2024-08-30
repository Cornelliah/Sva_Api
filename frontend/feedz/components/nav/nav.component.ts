import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isNavbarCollapsed = true; 
  
  

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isAuthenticated();
    
    this.authService.isAdmin().subscribe(isAdmin => {
     return this.isAdmin = isAdmin;
    });
  }
  
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed; 
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.isAdmin = false;
        this.isLoggedIn = false;

        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Déconnexion échouée', error);
      }
    });
  }
}
