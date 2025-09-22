// src/app/resultados/resultados.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api';


@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css'
})
export class Resultados implements OnInit {

  resultados: any[] = [];
  corridaId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.corridaId = Number(params.get('corridaId'));
      if (this.corridaId) {
        this.getVotacaoResultados();
      }
    });
  }

  getVotacaoResultados(): void {
    if (this.corridaId === null) return;
    this.apiService.getVotacaoResultados(this.corridaId).subscribe(data => {
      this.resultados = data;
      console.log('Resultados da votação:', this.resultados);
    });
  }
}