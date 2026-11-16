import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
  IonItem, IonLabel, IonNote,
} from '@ionic/angular';
import { ItemReciclavel, ResumoSemanal } from '../models';
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
  resumo: ResumoSemanal;
  item: ItemReciclavel | null;

  constructor(private service: ReciclagemService, private router: Router) {
    this.resumo = this.service.obterResumo();
    this.item = this.service.selecionado;
  }

  get metaAtingida() {
    return this.resumo.pontosSemana >= this.resumo.metaSemanal;
  }

  voltar() {
    this.router.navigateByUrl('/home');
  }

  registrar() {
    this.service.registrarEntrega();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}