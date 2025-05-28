import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CategoryViewerComponent } from '../category-viewer/category-viewer.component';
import { CategoryModel } from '../../models/categoryModel';
import { CategoriesService } from '../../services/categories/categories.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-bottom-sheet-categories',
  imports: [
    CategoryViewerComponent
  ],
  templateUrl: './bottom-sheet-categories.component.html',
  styleUrl: './bottom-sheet-categories.component.css'
})
export class BottomSheetCategoriesComponent implements OnInit {
  constructor(
    private service:CategoriesService,
    private users:UsersService
  ) {}
  categories= signal<CategoryModel[]>([])
selectedCategory($event: string) {
console.log("selectedCategory tobe removed", $event)
this.categoriesKey.set(this.categoriesKey().filter(cat => cat != $event))

}
  categoriesKey = signal<string[]>([])
  async ngOnInit(): Promise<void> {
    console.log("data",this.data)
    this.categoriesKey.set(this.data.categoriesKey)
    const loggedUser =await  this.users.getLoggedUser()
    const categories = await this.service.listCategories4User(loggedUser.key)
    console.log("categories",categories)
    this.categories.set(categories)
  }
     readonly data = inject<{categoriesKey:string[]}>(MAT_BOTTOM_SHEET_DATA)
        readonly MatBottomSheetRef = inject(MatBottomSheetRef)

}
