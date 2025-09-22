// src/app/ranking-geral/ranking-geral.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api';


@Component({
  selector: 'app-ranking-geral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking-geral.html',
  styleUrl: './ranking-geral.css'
})
export class RankingGeral implements OnInit {

  ranking: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getRankingGeral();
  }

  getRankingGeral(): void {
    this.apiService.getRankingGeral().subscribe(data => {
      this.ranking = data;
      console.log('Ranking Geral:', this.ranking);
    });
  }
}