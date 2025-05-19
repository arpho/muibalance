import { Component,  model, OnInit, output } from '@angular/core';
import { ItemsModel } from '../../models/itemsModel';
import { MatTableModule } from '@angular/material/table';
import { CategoryViewerComponent } from '../category-viewer/category-viewer.component';

@Component({
  selector: 'app-items-table',
  imports: [
    MatTableModule,
    CategoryViewerComponent
  ],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.css',
  standalone: true
})
export class ItemsTableComponent implements  OnInit{
    displayedColumns: string[] = ['descrizione',  'note','prezzo','categorie'];
  ngOnInit(): void {
console.log("items table",this.items())
  }
  items = model<ItemsModel[]>([])
  itemsListChanged=output<ItemsModel[]>()

}
