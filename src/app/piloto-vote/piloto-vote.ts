// src/app/piloto-vote/piloto-vote.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-piloto-vote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './piloto-vote.html',
  styleUrl: './piloto-vote.css'
})
export class PilotoVote implements OnInit {

  corridaId: number | null = null;
  pilotos: any[] = [];
  corrida: any = null;
  statusMessage: string = '';
  votacaoFechada: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
     private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Pega o ID da corrida da URL
    this.route.paramMap.subscribe(params => {
      this.corridaId = Number(params.get('corridaId'));
      this.getPilotos(); // Chama a função para buscar os pilotos
      this.loadCorridaDetails();
      this.checkVotacaoStatus();
    });
  }

  getPilotos(): void {
    this.apiService.getPilotos().subscribe(data => {
      this.pilotos = data;
      console.log('Pilotos obtidos da API:', this.pilotos);
    });
  }

  checkVotacaoStatus(): void {
    if (this.corridaId === null) return;
    this.apiService.getCorridas().subscribe(corridas => {
      const corrida = corridas.find(c => c.id === this.corridaId);
      if (corrida) {
        this.votacaoFechada = corrida.votacao_fechada;
        if (this.votacaoFechada) {
          this.statusMessage = 'A votação para esta corrida já foi encerrada.';
        }
      }
    });
  }
  
  loadCorridaDetails(): void {
    if (this.corridaId === null) return;
    this.apiService.getCorridas().subscribe(corridas => {
      this.corrida = corridas.find(c => c.id === this.corridaId);
      if (this.corrida) {
        this.votacaoFechada = this.corrida.votacao_fechada;
        if (this.votacaoFechada) {
          this.statusMessage = 'A votação para esta corrida já foi encerrada.';
        }
      }
    });
  }

  votarPiloto(pilotoId: number): void {
    if (this.votacaoFechada) {
      this.toastr.warning('A votação para esta corrida já foi encerrada.'); // Use o toast
      return;
    }

    if (this.corridaId === null) return;

    this.apiService.votar(this.corridaId, pilotoId).subscribe(
      response => {
        this.toastr.success('Voto registrado com sucesso!'); // Toast de sucesso
        setTimeout(() => {
          this.router.navigate(['/resultados', this.corridaId]);
        }, 2000);
      },
      error => {
        if (error.status === 409) {
          this.toastr.info('Você já votou nesta corrida.'); // Toast informativo
        } else {
          this.toastr.error('Erro ao registrar voto. Tente novamente.'); // Toast de erro
        }
      }
    );
  }
}