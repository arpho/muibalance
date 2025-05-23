import { Component, input, model, OnChanges, signal, SimpleChanges } from '@angular/core';
import { ItemsModel } from '../../models/itemsModel';

@Component({
  selector: 'app-item-expansion-panel',
  imports: [],
  templateUrl: './item-expansion-panel.component.html',
  styleUrl: './item-expansion-panel.component.css',
  standalone: true
})
export class ItemExpansionPanelComponent implements OnChanges{
  data=input<{item:ItemsModel,index?:number,operation?:string}>( {item:new ItemsModel(),index:0,operation:""} )

panelIsOpen=signal
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

}
