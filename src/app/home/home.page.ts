import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
} from '@ionic/angular';
import { ItemReciclagem } from '../models';
import { ReciclagemService } from '../reciclagem.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel],
})
export class HomePage {
  itens: ItemReciclagem[] = [];

  constructor(private service: ReciclagemService) {
    this.itens = this.service.listar();
  }
}