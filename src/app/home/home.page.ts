import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
  IonList, IonSearchbar,
} from '@ionic/angular';
import { ReciclagemService } from '../reciclagem.service';
import { AuthService } from '../auth.service';
import { ItemCardComponent } from '../components/item-card/item-card.component';
import { ItemReciclavel } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
    IonList, IonSearchbar, ItemCardComponent,
  ],
})
export class HomePage {
  readonly svc = inject(ReciclagemService);
  private auth = inject(AuthService);
  private router = inject(Router);

  aoEscolher(item: ItemReciclavel) {
    this.svc.selecionar(item);
  }

  continuar() {
    if (this.svc.selecionado()) this.router.navigateByUrl('/resumo');
  }

  async sair() {
    await this.auth.sair();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}