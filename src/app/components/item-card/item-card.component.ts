import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonItem, IonLabel, IonButton } from '@ionic/angular';
import { ItemReciclavel } from '../../models';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  standalone: true,
  imports: [IonItem, IonLabel, IonButton],
})
export class ItemCardComponent {
  @Input({ required: true }) item!: ItemReciclavel;
  @Input() selecionado = false;

  @Output() escolher = new EventEmitter<ItemReciclavel>();

  clicar() {
    this.escolher.emit(this.item);
  }
}