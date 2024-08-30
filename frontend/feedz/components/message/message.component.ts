import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NavComponent, ReactiveFormsModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  smsForm: FormGroup;
  totalMessages = 0;
  successfulMessages = 0;
  failedMessages = 0;

  constructor(
    private fb: FormBuilder,
    private smsService: MessageService,
    private statsService: StatisticsService,
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
      let message = `Vous avez reçu un message du "${expediteur}"\n ${contenu}`;

    
      this.totalMessages++;

      this.smsService.sendMessage(destinataire, message).subscribe({
        next: (response) => {
          console.log('Message envoyé avec succès', response);
          this.successfulMessages++;

          // Redirection après succès
          this.router.navigate(['/confirmation']); 
        },
        error: (error) => {
          
          console.error('Erreur lors de l\'envoi du message', error);
          this.failedMessages++;
        },
        complete: () => {
          // Envoyer les statistiques mises à jour
          this.updateStatistics();
        }
      });
    }
  }

  private updateStatistics(): void {
    const stats = {
      date: this.formatDate(new Date()),  
      number_of_sends: this.totalMessages,
      number_of_success: this.successfulMessages,
      number_of_failures: this.failedMessages
    };

    this.statsService.updateStatistics(stats).subscribe(
      response => console.log('Statistiques mises à jour'),
      error => console.error('Erreur lors de la mise à jour des statistiques', error)
    );
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
