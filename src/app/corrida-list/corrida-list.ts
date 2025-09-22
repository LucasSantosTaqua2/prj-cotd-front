// src/app/corrida-list/corrida-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe para usar diretivas como o ngFor
import { ApiService } from '../api';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-corrida-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './corrida-list.html',
  styleUrl: './corrida-list.css'
})
export class CorridaList implements OnInit {

  corridas: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCorridas().subscribe(data => {
      this.corridas = data;
      console.log('Corridas obtidas da API:', this.corridas);
    });
  }
}