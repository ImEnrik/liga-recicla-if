import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
  IonSearchbar, IonChip, IonLabel,
} from '@ionic/angular/';
import { Faixa, ReciclagemService } from '../reciclagem.service';
import { AuthService } from '../auth.service';
import { ItemCardComponent } from '../components/item-card/item-card.component';
import { ItemReciclavel } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    NgFor, NgIf, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonSearchbar, IonChip, IonLabel, ItemCardComponent,
  ],
})
export class HomePage {
  readonly svc = inject(ReciclagemService);
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly faixas: { valor: Faixa; rotulo: string }[] = [
    { valor: 'todos', rotulo: 'Todos' },
    { valor: 'ate8', rotulo: 'Até 8 pts' },
    { valor: 'mais8', rotulo: 'Mais de 8 pts' },
  ];

  aoEscolher(item: ItemReciclavel) {
    this.svc.selecionar(item);
  }

  trackById(_: number, item: ItemReciclavel) {   // <-- aqui
    return item.id;
  }

  continuar() {
    if (this.svc.selecionado()) this.router.navigateByUrl('/resumo');
  }

  async sair() {
    await this.auth.sair();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}