import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-vote',
  standalone:true,
  imports:[NavComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent {

  constructor(
    private smsService: MessageService,
    private router: Router
  ) {
    
  }



  showPollForm = false;
  pollName = '';
  pollOptions = '';
  sender = '';
  recipients = '';

  createPoll() {
    const optionsArray = this.pollOptions.split('\n');
    const contactsArray = this.recipients.split('\n');

    let message = `Cher utilisateur, dans le cadre du sondage "${this.pollName}", 
    nous vous invitons à envoyer votre vote par SMS au numéro "${this.sender}".\n`;

    optionsArray.forEach((option, index) => {
      message += `Votez ${index + 1} pour l'option "${option}".\n`;
    });

    contactsArray.forEach((contact: string) => {
      if (contact) {
        this.sendSMS(this.sender,contact,message);
      }
    });

    
  }

  sendSMS(expediteur: string, destinataire: string, message: string, ) {
    
    this.smsService.sendMessage( destinataire, message).subscribe({
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
