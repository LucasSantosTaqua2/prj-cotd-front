// src/app/admin/login/login.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicione o FormsModule aqui
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';
  private apiUrl = 'https://prj-cotd-back-production.up.railway.app';

  constructor(private http: HttpClient, private router: Router) { }

  onLogin(): void {
    const formData = new URLSearchParams();
    formData.set('username', this.username);
    formData.set('password', this.password);

    this.http.post<any>(`${this.apiUrl}/token`, formData.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe(
      response => {
        // Login bem-sucedido: salva o token e redireciona
        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/admin/dashboard']); // Vamos criar esta rota depois
      },
      error => {
        // Exibe a mensagem de erro da API
        this.errorMessage = 'Usuário ou senha inválidos.';
        console.error('Erro de login:', error);
      }
    );
  }
}
