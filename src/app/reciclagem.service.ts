import { Injectable } from '@angular/core';
import { ItemReciclavel, ResumoSemanal } from './models';

@Injectable({ providedIn: 'root' })
export class ReciclagemService {
  private itens: ItemReciclavel[] = [
    { id: '1', nome: 'Garrafas PET', pontos: 10 },
    { id: '2', nome: 'Papel/papelão', pontos: 5 },
    { id: '3', nome: 'Latinhas', pontos: 8 },
    { id: '4', nome: 'Eletrônicos', pontos: 20 },
    { id: '5', nome: 'Orgânico', pontos: 3 },
  ];

  private resumo: ResumoSemanal = { pontosSemana: 18, metaSemanal: 30 };

  selecionado: ItemReciclavel | null = null;

  listar(): ItemReciclavel[] {
    return this.itens;
  }

  obterResumo(): ResumoSemanal {
    return this.resumo;
  }

  selecionar(item: ItemReciclavel) {
    this.selecionado = item;
  }

  registrarEntrega() {
    if (!this.selecionado) return;
    this.resumo = {
      ...this.resumo,
      pontosSemana: this.resumo.pontosSemana + this.selecionado.pontos,
    };
    this.selecionado = null;
  }
}