import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CategoryViewerComponent } from '../category-viewer/category-viewer.component';

@Component({
  selector: 'app-bottom-sheet-categories',
  imports: [
    CategoryViewerComponent
  ],
  templateUrl: './bottom-sheet-categories.component.html',
  styleUrl: './bottom-sheet-categories.component.css'
})
export class BottomSheetCategoriesComponent implements OnInit {
selectedCategory($event: string) {
console.log("selectedCategory tobe removed", $event)
}
  categoriesKey = signal<string[]>([])
  ngOnInit(): void {
    console.log("data",this.data)
    this.categoriesKey.set(this.data.categoriesKey)
  }
     readonly data = inject<{categoriesKey:string[]}>(MAT_BOTTOM_SHEET_DATA)
        readonly MatBottomSheetRef = inject(MatBottomSheetRef)

}
