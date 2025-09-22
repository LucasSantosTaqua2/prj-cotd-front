import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api';

@Component({
  selector: 'app-corrida-gerenciamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './corrida-gerenciamento.html',
  styleUrl: './corrida-gerenciamento.css'
})
export class CorridaGerenciamento implements OnInit {

  corridas: any[] = [];
  currentCorrida: any = { nome: '', data_corrida: '' };
  isEditing = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCorridas();
  }

  getCorridas(): void {
    this.apiService.getCorridas().subscribe(data => {
      this.corridas = data;
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.apiService.updateCorrida(this.currentCorrida.id, this.currentCorrida).subscribe(() => {
        this.getCorridas();
        this.resetForm();
      });
    } else {
      this.apiService.addCorrida(this.currentCorrida).subscribe(() => {
        this.getCorridas();
        this.resetForm();
      });
    }
  }

  onEdit(corrida: any): void {
    this.isEditing = true;
    this.currentCorrida = { ...corrida, data_corrida: corrida.data_corrida.split('T')[0] };
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta corrida? Todos os votos associados também serão removidos.')) {
      this.apiService.deleteCorrida(id).subscribe(() => {
        this.getCorridas();
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentCorrida = { nome: '', data_corrida: '' };
  }

  onFecharVotacao(id: number): void {
    if (confirm('Tem certeza que deseja fechar a votação desta corrida?')) {
      this.apiService.fecharVotacao(id).subscribe(() => {
        this.getCorridas();
      }); 
    } 
  }
}