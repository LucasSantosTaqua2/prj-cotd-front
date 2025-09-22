// src/app/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Corrida {
  id: number;
  nome: string;
  data_corrida: string;
  votacao_fechada: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = 'http://localhost:8000'; // URL da sua API em Python

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }



  getCorridas(): Observable<Corrida[]> {
    return this.http.get<Corrida[]>(`${this.apiUrl}/corridas`);
  }


  getPilotos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pilotos`);
  }

  votar(id_corrida: number, id_piloto: number): Observable<any> {
    const body = { id_corrida, id_piloto };
    return this.http.post<any>(`${this.apiUrl}/votar`, body);
  }

  getVotacaoResultados(id_corrida: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/resultados/${id_corrida}`);
  }

  addPiloto(piloto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/pilotos`, piloto, { headers: this.getAuthHeaders() });
  }

  // Novo método para editar um piloto (requer token)
  updatePiloto(id: number, piloto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/pilotos/${id}`, piloto, { headers: this.getAuthHeaders() });
  }

  // Novo método para deletar um piloto (requer token)
  deletePiloto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/pilotos/${id}`, { headers: this.getAuthHeaders() });
  }

  addCorrida(corrida: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/corridas`, corrida, { headers: this.getAuthHeaders() });
  }

  updateCorrida(id: number, corrida: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/corridas/${id}`, corrida, { headers: this.getAuthHeaders() });
  }

  deleteCorrida(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/corridas/${id}`, { headers: this.getAuthHeaders() });
  }

  fecharVotacao(id_corrida: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/corridas/${id_corrida}/fechar-votacao`, {}, { headers: this.getAuthHeaders() });
  }

  getRankingGeral(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ranking-geral`);
  }
}