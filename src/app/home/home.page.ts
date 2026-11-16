import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
  IonList, IonItem, IonLabel, IonSearchbar,
} from '@ionic/angular';
import { ReciclagemService } from '../reciclagem.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
    IonList, IonItem, IonLabel, IonSearchbar,
  ],
})
export class HomePage {
  readonly svc = inject(ReciclagemService);
  private auth = inject(AuthService);
  private router = inject(Router);

  continuar() {
    if (this.svc.selecionado()) this.router.navigateByUrl('/resumo');
  }

  async sair() {
    await this.auth.sair();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}