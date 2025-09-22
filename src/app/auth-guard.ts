import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  if (token) {
    return true; // Permite a navegação
  } else {
    // Redireciona para a página de login se não houver token
    router.navigate(['/admin']);
    return false; // Bloqueia a navegação
  }
};