import { Component, model, OnChanges, output, SimpleChanges } from '@angular/core';
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

  chipEvent = output<string>()
categoryClicked($event: any) {
this.chipEvent.emit($event)
}
ngOnChanges(changes: SimpleChanges): void {
}
categoriesKey = model.required<string[]>();

}
