import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent],  
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private snackBar: MatSnackBar, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      this.registerService.register(email, password).subscribe({
        next: (response) => {

          localStorage.setItem('token', response.token);
          this.router.navigate(['/messages']);
        },
        error: (error) => {
          console.error('Inscription échouée', error);
          this.snackBar.open('Échec de l\'inscription. Veuillez réessayer.', 'Fermer', {
            duration: 5000,
          });
        }
      });
    }
  }
}
