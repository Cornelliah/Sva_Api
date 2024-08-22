import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NavComponent, ReactiveFormsModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  smsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private smsService: MessageService,
    private router: Router
  ) {
    this.smsForm = this.fb.group({
      expediteur: ['', Validators.required],
      destinataire: ['', Validators.required],
      contenu: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.smsForm.valid) {
      const { expediteur, destinataire, contenu } = this.smsForm.value;

      this.smsService.sendMessage(expediteur, destinataire, contenu).subscribe({
        next: (response) => {
          // Handle successful response
          console.log('Message envoyé avec succès', response);
          this.router.navigate(['/confirmation']); 
        },
        error: (error) => {
          // Handle error response
          console.error('Erreur lors de l\'envoi du message', error);
        }
      });
    }
  }
}
