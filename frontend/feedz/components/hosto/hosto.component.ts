import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppointmentService } from '../../services/appointment.service';
import { MessageService } from '../../services/message.service';
import { NavComponent } from '../nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hosto',
  standalone: true,
  imports: [NavComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './hosto.component.html',
  styleUrls: ['./hosto.component.css']
})
export class HostoComponent {

  userId: number | null = null;
  appointments: any[] = [];
  showAddForm = false;
  showEditForm = false;
  newAppointment = { patientName: '', patientPhone: '', date: '', user_id: this.userId }; 
  selectedAppointment: any = {};

  constructor(private appointmentService: AppointmentService, 
    private authService: AuthService, 
    private smsService: MessageService,
    private router: Router) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur connecté
    this.authService.getUserId().subscribe(userId => {
      this.userId = userId;
      this.newAppointment.user_id = userId; 
      this.loadAppointments();
    });
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.appointments = appointments;
    });
  }

  addAppointment() {
   
    if (this.userId !== null) {
      this.newAppointment.user_id = this.userId; 
      this.appointmentService.addAppointment(this.newAppointment).subscribe(() => {
        this.loadAppointments();
        this.showAddForm = false;
      });
    } else {
      console.error('L\'ID utilisateur est null, le rendez-vous ne peut pas être ajouté.');
    }

    let message = `Cher(e) ${this.newAppointment.patientName},
     vous avez un rendez-vous pour le ${this.newAppointment.date}, 
    .\n`;


    this.smsService.sendMessage( this.newAppointment.patientPhone, message).subscribe(
      response => {
        
        console.log('Message envoyé avec succès à', this.newAppointment.patientPhone, response);

        this.newAppointment = { patientName: '', patientPhone: '', date: '', user_id: this.userId }; 

      },
      error => {
        console.error('Erreur lors de l\'envoi du message à',this.newAppointment.patientPhone, error);
      }
    );


  }

  editAppointment(appointment: any) {
    this.selectedAppointment = { ...appointment };
    this.showEditForm = true;
  }

  updateAppointment() {
    this.appointmentService.updateAppointment(this.selectedAppointment).subscribe(() => {
      this.loadAppointments();
      this.showEditForm = false;
    });
  }

  cancelAppointment(appointmentId: number) {
    this.appointmentService.cancelAppointment(appointmentId).subscribe(() => {
      this.loadAppointments();
    });
  }
}
