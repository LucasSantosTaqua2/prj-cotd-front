import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-piloto-gerenciamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './piloto-gerenciamento.html',
  styleUrl: './piloto-gerenciamento.css'
})
export class PilotoGerenciamento implements OnInit {

  pilotos: any[] = [];
  currentPiloto: any = { nome: '', equipe: '', foto: '' };
  isEditing = false;

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPilotos();
  }

  getPilotos(): void {
    this.apiService.getPilotos().subscribe(data => {
      this.pilotos = data;
    });
  }

 onSubmit(): void {
    if (this.isEditing) {
      this.apiService.updatePiloto(this.currentPiloto.id, this.currentPiloto).subscribe(() => {
        this.getPilotos();
        this.resetForm();
        this.toastr.success('Piloto atualizado com sucesso!'); // Toast de sucesso
      });
    } else {
      this.apiService.addPiloto(this.currentPiloto).subscribe(() => {
        this.getPilotos();
        this.resetForm();
        this.toastr.success('Piloto adicionado com sucesso!'); // Toast de sucesso
      });
    }
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja excluir este piloto?')) {
      this.apiService.deletePiloto(id).subscribe(() => {
        this.getPilotos();
        this.toastr.success('Piloto excluído com sucesso!'); // Toast de sucesso
      });
    }
  }


  onEdit(piloto: any): void {
    this.isEditing = true;
    this.currentPiloto = { ...piloto };
  }


  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentPiloto = { nome: '', equipe: '', foto: '' };
  }
}