import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { ChatbotComponent } from './layout/chatbot/chatbot.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'chatbot', component: ChatbotComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];
