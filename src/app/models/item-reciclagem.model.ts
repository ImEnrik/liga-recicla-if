export interface ItemReciclagem {
  id: string;
  nome: string;
  tipo: 'plastico' | 'papel' | 'vidro' | 'metal' | 'organico' | 'outro';
  quantidade: number;
  pontos: number;
  data: string;
}