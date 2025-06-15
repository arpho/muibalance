import { Component,  model, OnInit, output, signal } from '@angular/core';
import { ItemsModel } from '../../models/itemsModel';
import { MatTableModule } from '@angular/material/table';
import { CategoryViewerComponent } from '../category-viewer/category-viewer.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ItemExpansionPanelComponent } from '../item-expansion-panel/item-expansion-panel.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-items-table',
  imports: [
    MatTableModule,
    CategoryViewerComponent,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    ItemExpansionPanelComponent,
    MatMenuModule
  ],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.css',
  standalone: true
})
export class ItemsTableComponent implements  OnInit{
selectItem(item: any, index: any) {
console.log("selectItem from item selector", item,index)

}

deleteItem(index:number) {
console.log("deleteItem from item selector", index)
this.items().splice(index,1)
this.items.set([...this.items()])
this.itemsListChanged.emit(this.items())
}
updateItem(item: ItemsModel, index: any) {
  console.log("updateItem from item selector", item,"on index",index)
this.item2edit.set({item:item,operation:"update",index:index})
}
ItemEdited(data: any) {
console.log("ItemEdited",data)
if(data.operation=="update"){
  this.items().splice(data.index,1,data.item)
  this.items.set([...this.items()])
  this.itemsListChanged.emit(this.items())

}
if(data.operation=="add"){
  const newList = [...this.items(),data.item]
  this.items.set(newList)
  console.log(" addwd item to newList",this.items())
  this.itemsListChanged.emit(this.items())
}
}
item2edit=signal<{item:ItemsModel,operation:string,index?:number}|null>(null)
insertNewItem() {
console.log("insertNewItem")
this.item2edit.set({item:new ItemsModel(),operation:"add"})
}
    displayedColumns: string[] = ['descrizione',  'note','prezzo','categorie'];
  ngOnInit(): void {
console.log("items table",this.items())
  }
  items = model<ItemsModel[]>([])
  itemsListChanged=output<ItemsModel[]>()

}
