import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
import { CategoryViewerComponent } from '../category-viewer/category-viewer.component';
import { MatLineModule } from '@angular/material/core';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { BottomSheetCategoriesComponent } from '../bottom-sheet-categories/bottom-sheet-categories.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cateories-selector',
  imports: [
    CategoryViewerComponent,
    MatLabel,
    MatIconModule,
    MatButtonModule,
    MatButtonModule,
    MatBottomSheetModule
  ],
  templateUrl: './cateories-selector.component.html',
  styleUrl: './cateories-selector.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CateoriesSelectorComponent {
  subscriptions = new Subscription()
  constructor(
    private $bottomSheet: MatBottomSheet
  )
  {}
  async assignCategories() {
console.log("assign categories")
const dialogRef = this.$bottomSheet.open(BottomSheetCategoriesComponent,{
  data: {categoriesKey:this.categoriesKey()},

})
this.subscriptions.add(dialogRef.afterDismissed().subscribe(res=>{
  if(res){
    console.log("selected",res)
    this.categoriesKey.set(res)
    this.categoriesUpdated.emit(this.categoriesKey())
  }
}))
}

  categoriesKey = model.required<string[]>();
  categoriesUpdated= output<string[]>()
selectedCategory($event: string) {
console.log("selectedCategory", $event)

this.categoriesKey.set(this.categoriesKey().filter(cat => cat != $event))
this.categoriesUpdated.emit(this.categoriesKey())
}

}
