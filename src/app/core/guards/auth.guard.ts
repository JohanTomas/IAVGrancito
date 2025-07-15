import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si estamos en el navegador
  if (typeof window !== 'undefined') {
    if (authService.isAuthenticated()) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    // En SSR, permitir la navegación pero el componente manejará la lógica
    return true;
  }
}; 