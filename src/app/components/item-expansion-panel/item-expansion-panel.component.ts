import { ChangeDetectionStrategy, Component, input, model, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { ItemsModel } from '../../models/itemsModel';
import { ReactiveFormsModule, FormsModule, FormGroup, Form, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CateoriesSelectorComponent } from '../cateories-selector/cateories-selector.component';

@Component({
  selector: 'app-item-expansion-panel',
  imports: [MatExpansionModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormField,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatLabel,
      CateoriesSelectorComponent
      ],
  templateUrl: './item-expansion-panel.component.html',
  styleUrl: './item-expansion-panel.component.css',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ItemExpansionPanelComponent implements OnChanges{
selectedCategory($event: string[]) {
console.log("selectedCategory", $event)
}

  data=input<{item:ItemsModel,operation:string,index?:number }|null>()
  updated=output<{item:ItemsModel,operation:string,index?:number}>()
  descrizione=signal("")
  note=signal("")
  prezzo=signal(0)
  moneta=signal("")
  picture=signal("")
  categoriesKey=signal<string[]>([])

panelIsOpen=signal(false)
itemForm : FormGroup = new FormGroup({})
immagine: string = '';
  ngOnChanges(changes: SimpleChanges): void {
    if(changes["data"].currentValue){
      console.log("data",changes["data"].currentValue)
      this.descrizione.set(changes["data"].currentValue.item.descrizione)
      this.note.set(changes["data"].currentValue.item.note)
      this.prezzo.set(changes["data"].currentValue.item.prezzo)
      this.moneta.set(changes["data"].currentValue.item.moneta)
      this.picture.set(changes["data"].currentValue.item.picture)
      this.categoriesKey.set(changes["data"].currentValue.item.categoriesKey)
      this.panelIsOpen.set(true)
      this.itemForm = this.fb.group({
        descrizione: this.descrizione(),
        note: this.note(),
        prezzo: this.prezzo(),
        moneta: this.moneta(),
        picture: this.picture(),
        categoriesKey: this.categoriesKey()
      })

    }
  }
  constructor(
    private fb:FormBuilder
  ) {
    this.itemForm = this.fb.group({
      descrizione: this.descrizione(),
      note: this.note(),
      prezzo: this.prezzo(),
      moneta: this.moneta(),
      picture: this.picture(),
      categoriesKey: this.categoriesKey()
    })
  }

}
