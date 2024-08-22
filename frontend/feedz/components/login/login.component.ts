import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { NavComponent } from '../nav/nav.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, NavComponent],  
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar,  private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            // Handle successful login here
            localStorage.setItem('token', response.token);
            console.log('Login successful', response);
            this.router.navigate(['/messages']);
          },
          error: (error) => {
            // Handle login error here
            console.error('Login error', error);
             
          }
        });
    }
  }
}
