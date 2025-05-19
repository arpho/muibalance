import { Component, model, OnChanges, SimpleChanges } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { CategoryChipComponent } from '../category-chip/category-chip.component';

@Component({
  selector: 'app-category-viewer',
  imports: [
    MatChipsModule,
    CategoryChipComponent
  ],
  templateUrl: './category-viewer.component.html',
  styleUrl: './category-viewer.component.css',
  standalone: true
})
export class CategoryViewerComponent implements OnChanges{
ngOnChanges(changes: SimpleChanges): void {
  console.log("changes on category viewer",changes)
}
categoriesKey = model.required<string[]>();

}
