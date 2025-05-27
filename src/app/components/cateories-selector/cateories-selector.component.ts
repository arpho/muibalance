import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
import { CategoryViewerComponent } from '../category-viewer/category-viewer.component';
import { MatLineModule } from '@angular/material/core';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-cateories-selector',
  imports: [
    CategoryViewerComponent,
    MatLabel
  ],
  templateUrl: './cateories-selector.component.html',
  styleUrl: './cateories-selector.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CateoriesSelectorComponent {
  categoriesKey = model.required<string[]>();
  categoriesUpdated= output<string[]>()
selectedCategory($event: string) {
console.log("selectedCategory", $event)
this.categoriesKey.set(this.categoriesKey().filter(cat => cat != $event))
this.categoriesUpdated.emit(this.categoriesKey())
}

}
