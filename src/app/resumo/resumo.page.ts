import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
  IonItem, IonLabel, IonNote,
} from '@ionic/angular';
import { ReciclagemService } from '../reciclagem.service';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
    IonItem, IonLabel, IonNote,
  ],
})
export class ResumoPage {
  readonly svc = inject(ReciclagemService);
  private router = inject(Router);

  voltar() {
    this.router.navigateByUrl('/home');
  }

  registrar() {
    if (this.svc.registrarEntrega()) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
  }
}