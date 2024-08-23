import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { NavComponent } from '../nav/nav.component';
import { CampaignService } from '../../services/campaign.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [NavComponent, ReactiveFormsModule],
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {

  campaignForm: FormGroup;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private campaignService: CampaignService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      contacts: ['', Validators.required],
      message: ['', Validators.required],
      num: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur connecté
    this.authService.getUserId().subscribe(userId => {
      this.userId = userId;
    });
  }
 
  onSubmit(): void {
    console.log('onSubmit called');
  
    if (this.campaignForm.valid && this.userId !== null) {
      console.log('Form is valid');
  
      const formValue = this.campaignForm.value;
  
      // Diviser les contacts en un tableau
      const contactsArray: string[] = formValue.contacts.split('\n').map((contact: string) => contact.trim());
  
      // Préparer l'objet campagne pour l'ajout à la base de données
      const campaign = {
        nom: formValue.name,
        contacts: contactsArray,
        user_id: this.userId  
      };

      // Envoyer chaque message à chaque contact
      contactsArray.forEach((contact: string) => {
        if (contact) {
          this.messageService.sendMessage(formValue.num, contact, formValue.message).subscribe(
            response => {
              
              console.log('Message envoyé avec succès à', contact, response);
            },
            error => {
              console.error('Erreur lors de l\'envoi du message à', contact, error);
            }
          );
        }
      });
      
      // Ajouter la campagne dans la base de données
      this.campaignService.addCampaign(campaign).subscribe(
        (response) => {
          console.log('Campagne ajoutée avec succès', response);
    
          // Réinitialiser le formulaire après l'envoi
          this.campaignForm.reset({
            name: '',
            contacts: '',
            message: '',
            num: ''
          });

          this.router.navigate(['/campagnes']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la campagne', error);
        }
      );
  
    } else {
      console.log('Form is invalid or userId is null');
    }
  }
}
