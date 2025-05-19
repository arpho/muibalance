import { Component, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { CategoryModel } from '../../models/categoryModel';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-category-chip',
  imports: [
    CategoryChipComponent,
    MatChipsModule
  ],
  templateUrl: './category-chip.component.html',
  styleUrl: './category-chip.component.css',
  standalone: true
})
export class CategoryChipComponent implements OnChanges {

  constructor(
    private service:CategoriesService
  ){}
  categoryKey=input.required<string>()
  category = signal(new CategoryModel({title:""}))
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
console.log("changes on category chip",changes)

    const  category = await this.service.fetchCategoryFromFirestore(this.categoryKey());
    console.log("category",category)
    this.category.set(category);

  }

}
