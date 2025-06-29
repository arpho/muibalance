import { Component, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { CategoryModel } from '../../models/categoryModel';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-category-chip',
  imports: [
    MatChipsModule
  ],
  templateUrl: './category-chip.component.html',
  styleUrl: './category-chip.component.css',
  standalone: true
})
export class CategoryChipComponent implements OnChanges {
  clickedChip= output<string>()
selectedChip(arg0: string) {
this.clickedChip.emit(this.categoryKey())
console.log("clicked ",this.categoryKey())
}

  constructor(
    private service:CategoriesService
  ){}
  categoryKey=input.required<string>()
  category = signal(new CategoryModel({title:""}))

  async ngOnChanges(changes: SimpleChanges): Promise<void> {

    const  category = await this.service.fetchCategoryFromFirestore(this.categoryKey());
    this.category.set(category);

  }

}
