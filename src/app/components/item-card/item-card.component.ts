import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemReciclavel } from '../../models';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  standalone: true,
})
export class ItemCardComponent {
  @Input({ required: true }) item!: ItemReciclavel;
  @Input() selecionado = false;
  @Output() escolher = new EventEmitter<ItemReciclavel>();

  clicar() {
    this.escolher.emit(this.item);
  }
}