import { Component,  model, OnInit, output } from '@angular/core';
import { ItemsModel } from '../../models/itemsModel';
import { MatTableModule } from '@angular/material/table';
import { CategoryViewerComponent } from '../category-viewer/category-viewer.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-items-table',
  imports: [
    MatTableModule,
    CategoryViewerComponent,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.css',
  standalone: true
})
export class ItemsTableComponent implements  OnInit{
insertNewItem() {
throw new Error('Method not implemented.');
}
    displayedColumns: string[] = ['descrizione',  'note','prezzo','categorie'];
  ngOnInit(): void {
console.log("items table",this.items())
  }
  items = model<ItemsModel[]>([])
  itemsListChanged=output<ItemsModel[]>()

}
