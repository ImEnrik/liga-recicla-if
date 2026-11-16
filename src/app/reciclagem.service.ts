import { Injectable, computed, signal } from '@angular/core';
import { ItemReciclavel, ResumoSemanal } from './models';

@Injectable({ providedIn: 'root' })
export class ReciclagemService {
  // ---------- estado ----------
  private readonly _itens = signal<ItemReciclavel[]>([
    { id: '1', nome: 'Garrafas PET', pontos: 10 },
    { id: '2', nome: 'Papel/papelão', pontos: 5 },
    { id: '3', nome: 'Latinhas', pontos: 8 },
    { id: '4', nome: 'Eletrônicos', pontos: 20 },
    { id: '5', nome: 'Orgânico', pontos: 3 },
  ]);
  private readonly _resumo = signal<ResumoSemanal>({ pontosSemana: 18, metaSemanal: 30 });
  private readonly _busca = signal('');
  private readonly _selecionado = signal<ItemReciclavel | null>(null);

  // ---------- leitura (o que as páginas mostram) ----------
  readonly busca = this._busca.asReadonly();
  readonly selecionado = this._selecionado.asReadonly();
  readonly resumo = this._resumo.asReadonly();

  /** Filtro: busca por nome, sem diferenciar acento ou maiúscula. */
  readonly itensFiltrados = computed(() => {
    const termo = this.normalizar(this._busca());
    return this._itens().filter((i) => this.normalizar(i.nome).includes(termo));
  });

  /** Total de pontos da seleção atual. */
  readonly pontosSelecionado = computed(() => this._selecionado()?.pontos ?? 0);

  /** Regra principal: meta atingida quando pontos >= meta. */
  readonly metaAtingida = computed(
    () => this._resumo().pontosSemana >= this._resumo().metaSemanal,
  );

  readonly pontosFaltando = computed(() =>
    Math.max(0, this._resumo().metaSemanal - this._resumo().pontosSemana),
  );

  readonly mensagemMeta = computed(() =>
    this.metaAtingida() ? 'Meta atingida!' : 'Meta ainda não atingida',
  );

  // ---------- ações ----------
  filtrar(termo: string) {
    this._busca.set(termo ?? '');
  }

  selecionar(item: ItemReciclavel) {
    this._selecionado.set(item);
  }

  estaSelecionado(item: ItemReciclavel) {
    return this._selecionado()?.id === item.id;
  }

  /** Soma os pontos do item escolhido e limpa a seleção. */
  registrarEntrega(): boolean {
    const item = this._selecionado();
    if (!item) return false;
    this._resumo.update((r) => ({ ...r, pontosSemana: r.pontosSemana + item.pontos }));
    this._selecionado.set(null);
    this._busca.set('');
    return true;
  }

  private normalizar(texto: string) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }
}