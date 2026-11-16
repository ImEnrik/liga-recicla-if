import { Injectable } from '@angular/core';
import { ItemReciclagem } from './models';

@Injectable({ providedIn: 'root' })
export class ReciclagemService {
  private itens: ItemReciclagem[] = [
    { id: '1', nome: 'Garrafas PET', tipo: 'plastico', quantidade: 12, pontos: 24, data: '2026-11-10' },
    { id: '2', nome: 'Caixas de papelão', tipo: 'papel', quantidade: 5, pontos: 10, data: '2026-11-11' },
    { id: '3', nome: 'Latas de alumínio', tipo: 'metal', quantidade: 20, pontos: 40, data: '2026-11-12' },
  ];

  listar(): ItemReciclagem[] {
    return this.itens;
  }
}