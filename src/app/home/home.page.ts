import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
  IonList, IonItem, IonLabel,
} from '@ionic/angular';
import { ItemReciclavel } from '../models';
import { ReciclagemService } from '../reciclagem.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
    IonList, IonItem, IonLabel,
  ],
})
export class HomePage {
  itens: ItemReciclavel[] = [];

  constructor(
    private service: ReciclagemService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.itens = this.service.listar();
  }

  escolher(item: ItemReciclavel) {
    this.service.selecionar(item);
  }

  ativo(item: ItemReciclavel) {
    return this.service.selecionado?.id === item.id;
  }

  continuar() {
    if (this.service.selecionado) {
      this.router.navigateByUrl('/resumo');
    }
  }

  async sair() {
    await this.auth.sair();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}