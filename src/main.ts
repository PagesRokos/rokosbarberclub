import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    const preloader = document.getElementById('app-preloader');
    if (preloader) {
      // Espera al menos 1 segundo antes de ocultar
      Promise.all([wait(1000)]).then(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
      });
    }
  })
  .catch((err) => console.error(err));
