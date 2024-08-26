const cron = require('node-cron');
const db = require('./db');


const FRONTEND_SMS_API_URL = 'http://localhost:4200/messages'; 


// Importer dynamiquement node-fetch
(async () => {
    const fetch = (await import('node-fetch')).default;


    cron.schedule('5 19 * * *', async () => {
        const now = new Date();
        const reminderDate = new Date(now.setHours(now.getHours() + 24)); 

        try {
            const [appointments] = await db.execute('SELECT * FROM appointment WHERE date = ?', [reminderDate]);

            appointments.forEach(appointment => {
                const message = `Cher(e) ${appointment.patientName}, ceci est un rappel pour votre rendez-vous prévu le ${appointment.date}.`;

                // Appel au service frontend pour envoyer le SMS
                fetch(FRONTEND_SMS_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        destinataire: appointment.patientPhone,
                        contenu: message
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('SMS envoyé avec succès:', data);
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi du SMS:', error);
                });
            });
        } catch (error) {
            console.error('Erreur lors de la planification des rappels:', error);
        }
    });
})();
