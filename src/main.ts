// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { ExpenseService } from './app/services/expense.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    ExpenseService
  ]
})
  .catch((err) => console.error(err));