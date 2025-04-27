import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-bottom-list',
  imports: [MatListModule],
  templateUrl: './bottom-list.component.html',
  styleUrl: './bottom-list.component.css',
  standalone: true
})
export class BottomListComponent implements OnInit{
selectItem(_t3: string) {
console.log(_t3)
this.MatBottomSheetRef.dismiss(_t3)
}
  itemsList =signal<string[]>([])
  ngOnInit(): void {
   console.log("data",this.data)
   this.itemsList.set(this.data)
   console.log("itemsList",this.itemsList())
  }
  readonly data = inject<string[]>(MAT_BOTTOM_SHEET_DATA)
  readonly MatBottomSheetRef = inject(MatBottomSheetRef)

}
