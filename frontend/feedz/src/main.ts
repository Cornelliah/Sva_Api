import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule,NoopAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatSnackBar } from '@angular/material/snack-bar';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()  ,
    provideRouter(routes),
    BrowserAnimationsModule,
    NoopAnimationsModule, 
    MatSnackBar
  ]
}).catch(err => console.error(err));
